// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
// Use MongoDB
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The users collection
const USER_COLLECTION = "users";
// The items collection
const ITEM_COLLECTION = "items";
// Create new instance of the express server
var app = express();

var cors = require('cors');

app.use(cors());

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Local database URI.
const LOCAL_DATABASE = "mongodb+srv://admin:vRhlw8pNpNFfVw7U@mean-stack-training.w9z2t.mongodb.net/capstone?retryWrites=true&w=majority";
// Local port.
const LOCAL_PORT = 8080;

// Init the server
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = client.db();
        console.log("Database connection done.");

        // Initialize the app.
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });

app.post("/api/login", async function(req, res) {
    const data = req.body;
    database.collection(USER_COLLECTION).findOne({username: data.username, password: data.password}, function(error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.send(data);
        }
    });
})

/*  "/api/products"
 *  GET: finds all products
    NEEDS WORK
 */
app.get("/api/users", function (req, res) {
    database.collection(USER_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/products"
 *   POST: registers a new user
 */
app.post("/api/users", function (req, res) {
    var user = req.body;

    if (!user.username) {
        manageError(res, "Invalid user username", "Username is mandatory.", 400);
    } else if (!user.password) {
        manageError(res, "Invalid user password", "Password is mandatory.", 400);
    } else {
        database.collection(USER_COLLECTION).insertOne(user, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new user.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/users/:username"
 *   DELETE: deletes user by username
 */
app.delete("/api/users/:username", function (req, res) {
    database.collection(USER_COLLECTION).deleteOne({"username" : req.params.username}, function (err, result) {
        if (err) {
            manageError(res, err.message, "Failed to delete user.");
        } else {
            res.status(200).json(req.params.username);
        }
    });
});

/*  "/api/users/:username"
 *   PUT: Updates user by username
 */
app.put("/api/users", function (req, res) {
    var userGroup = req.body;
    let currentUser = userGroup.currentUser;
    let updatedUser = userGroup.updatedUser;
    database.collection(USER_COLLECTION).updateOne({username: currentUser.username}, {$set:{username: updatedUser.username, password: updatedUser.password}});
})

app.get("/api/items", function (req, res) {
    database.collection(ITEM_COLLECTION).find({}).toArray().then(result => {
        //console.log(result);
        res.send(result);
    });
});

/*  "/api/items"
 *   POST: Creates a new item
 */
app.post("/api/items", function (req, res) {
    let item = req.body;

    if (!item.name) {
        manageError(res, "Invalid item name", "Name is mandatory.", 400);
    } else if (!item.price) {
        manageError(res, "Invalid item price", "Price is mandatory.", 400);
    } else if (!item.imageLink) {
        manageError(res, "Invalid item image link", "Image is mandatory.", 400);
    } else {
        database.collection(ITEM_COLLECTION).insertOne(item, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new item.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/items/:name"
 *   DELETE: Deletes item by name
 */
app.delete("/api/items/:name", function (req, res) {
    database.collection(ITEM_COLLECTION).deleteOne({"name" : req.params.name}, function (err, result) {
        if (err) {
            manageError(res, err.message, "Failed to delete item.");
        } else {
            res.status(200).json(req.params.name);
        }
    });
    database.collection(USER_COLLECTION).updateOne(
        {}, {
            $pull:{
                shoppinglist: {
                    name: req.params.name
                },
                wishlist: {
                    name: req.params.name
                }
            }
        }
    );
});

/*  "/api/items/:username"
 *   PUT: Updates item by name
 */
app.put("/api/items", function (req, res) {
    var itemGroup = req.body;
    let currentItem = itemGroup.currentItem;
    console.log(currentItem);
    let updatedItem = itemGroup.updatedItem;
    database.collection(ITEM_COLLECTION).updateOne({name: currentItem}, {$set:{name: updatedItem.name, price: updatedItem.price, imageLink: updatedItem.imageLink}});
    database.collection(USER_COLLECTION).updateOne(
        {}, {
            $pull:{
                shoppinglist: {
                    name: currentItem
                },
                wishlist: {
                    name: currentItem
                }
            }
        }
    );
})


app.put("/api/shopping-list", function (req, res) {
    let package = req.body;
    let item = package.item;
    let username = package.username;
    database.collection(USER_COLLECTION).updateOne(
        {username: username}, {
            $push:{
                shoppinglist: {
                    name: item.name, 
                    price: item.price, 
                    imageLink: item.imageLink 
                }
            }
        }
    );
});

app.put("/api/wish-list", function (req, res) {
    let package = req.body;
    let item = package.item;
    let username = package.username;
    database.collection(USER_COLLECTION).updateOne(
        {username: username}, {
            $push:{
                wishlist: {
                    name: item.name, 
                    price: item.price, 
                    imageLink: item.imageLink 
                }
            }
        }
    );
});

app.post("/api/wish-list", async function(req, res) {
    const username = req.body.username;
    database.collection(USER_COLLECTION).findOne({username: username}, function(error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.send(data);
        }
    });
})

app.post("/api/shopping-list", async function(req, res) {
    const username = req.body.username;
    database.collection(USER_COLLECTION).findOne({username: username}, function(error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.send(data);
        }
    });
})

app.put("/api/shopping-list/remove", function (req, res) {
    let package = req.body;
    let item = package.item;
    let username = package.username;
    database.collection(USER_COLLECTION).updateOne(
        {username: username}, {
            $pull:{
                shoppinglist: {
                    name: item.name, 
                    price: item.price, 
                    imageLink: item.imageLink 
                }
            }
        }
    );
});

app.put("/api/wish-list/remove", function (req, res) {
    let package = req.body;
    let item = package.item;
    let username = package.username;
    database.collection(USER_COLLECTION).updateOne(
        {username: username}, {
            $pull:{
                wishlist: {
                    name: item.name, 
                    price: item.price, 
                    imageLink: item.imageLink 
                }
            }
        }
    );
});

// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}