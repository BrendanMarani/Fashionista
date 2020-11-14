import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private us: UserService) { }

  items;

  ngOnInit(): void {
    this.us.getWishList(localStorage.getItem("username"))
      .then((data:any) => {
        this.items = data.wishlist;
      })
  }

  deleteItem(index: number) {
    let item = this.items[index];
    let pass = {username: localStorage.getItem("username"), item: item};
    this.us.removeListItem(pass);
    window.location.reload();
  }

}
