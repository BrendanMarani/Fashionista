import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemUrl = '/api/items';

  constructor(private http:HttpClient) { }

  //Retrieve all of our items
    get():any{
        return new Promise(resolve => {
            this.http.get(this.itemUrl)
            .subscribe(data => {
                //console.log(data)
                resolve(data);
            })
        })
    }

    // Add/Register a new user
    create(itemdata:any):void{
        this.http.post(this.itemUrl, itemdata)
        .subscribe(data => {
            console.log(data)
        })
        console.log('Item is sent to the server',itemdata);
    }

    // Delete a user based on username
    delete(name: string): void {
        this.http.delete(`${this.itemUrl}/${name}`)
        .subscribe(data => {
            console.log(data)
        })
        console.log('Item deletion request has been sent to the server',name);
    }

    // Update an item
    update(itemGroup: any): void {
        this.http.put(this.itemUrl, itemGroup)
        .subscribe(data => {
            console.log(data)
        })
        console.log('Item update request has been sent to the server',itemGroup);
    }

    //Add items to shopping list
    toShoppingList(itemdata:any):void{
        this.http.put('/api/shopping-list', itemdata)
        .subscribe(data => {
            console.log(data)
        })
        console.log('Item is sent to the server', itemdata);
    }

    //Add items to wish list
    toWishList(itemdata:any):void{
        this.http.put('/api/wish-list', itemdata)
        .subscribe(data => {
            console.log(data)
        })
        console.log('Item is sent to the server',itemdata);
    }
}
