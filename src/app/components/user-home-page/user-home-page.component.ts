import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  constructor(private is: ItemService) { }

  items;

  ngOnInit(): void {
    this.is.get()
      .then((data:any) => {
        console.log(data);
        this.items = data;
      })
  }

  addToShoppingList(index: number) {
    let item = this.items[index];
    this.is.toShoppingList(this.includeUsername(item));
    console.log(this.includeUsername(item))
  }

  addToWishList(index: number) {
    let item = this.items[index];
    this.is.toWishList(this.includeUsername(item));
    console.log(this.includeUsername(item))
  }

  includeUsername(data: any):any {
    return {item: data, username: localStorage.getItem("username")};
  }
}
