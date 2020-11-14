import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, User } from '../entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/users';

  constructor(private http:HttpClient) { }

    get(userdata:any):void{
        this.http.post(this.userUrl, userdata)
        .subscribe(data => {
            console.log(data)
        })
        console.log('User is sent to the server',userdata);
    }

    // Add/Register a new user
    create(userdata:any):void{
        this.http.post(this.userUrl, userdata)
        .subscribe(data => {
            console.log(data)
        })
        console.log('User is sent to the server',userdata);
    }

    // Delete a user based on username
    delete(username: string): void {
        this.http.delete(`${this.userUrl}/${username}`)
        .subscribe(data => {
            console.log(data)
        })
        console.log('User deletion request has been sent to the server',username);
    }

    // Update a user
    update(userGroup: any): void {
        this.http.put(this.userUrl, userGroup)
        .subscribe(data => {
            console.log(data)
        })
        console.log('User update request has been sent to the server',userGroup);
    }

    getShoppingCart(data: any):any{
        const sendData = {username: data};
        return new Promise(resolve => {
            this.http.post("/api/shopping-list", sendData)
            .subscribe(data => {
                //console.log(data)
                resolve(data);
            })
        })
    }

    getWishList(data: any):any{
        const sendData = {username: data};
        return new Promise(resolve => {
            this.http.post("/api/wish-list", sendData)
            .subscribe(data => {
                resolve(data);
            })
        })
    }

    removeCartItem(data: any) {
        this.http.put("/api/shopping-list/remove", data)
        .subscribe(data => {
            console.log(data)
        })
        console.log('Item deletion request has been sent to the server', data.item.name);
    }

    removeListItem(data: any) {
        this.http.put("/api/wish-list/remove", data)
        .subscribe(data => {
            console.log(data)
        })
        console.log('Item deletion request has been sent to the server', data.item.name);
    }

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}

