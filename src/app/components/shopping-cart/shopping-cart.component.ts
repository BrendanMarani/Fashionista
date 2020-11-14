import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private us: UserService) { }

  items;

  ngOnInit(): void {
    this.us.getShoppingCart(localStorage.getItem("username"))
      .then((data:any) => {
        this.items = data.shoppinglist;
      })
  }
  
  deleteItem(index: number) {
    let item = this.items[index];
    let pass = {username: localStorage.getItem("username"), item: item};
    this.us.removeCartItem(pass);
    window.location.reload();
  }

}
