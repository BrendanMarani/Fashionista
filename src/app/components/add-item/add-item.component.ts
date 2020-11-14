import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/entities/item.model';
import { User } from 'src/app/entities/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected is: ItemService) { }

  ngOnInit(): void {
    this.createForm();
  }

  name: string = '';
  price: string = '';
  imageLink: string = '';

  addItemForm: FormGroup;

  createForm() {
    this.addItemForm = this.formBuilder.group( { //need to define children under group myform
      name: this.formBuilder.control(this.name, [Validators.required]),
      price: this.formBuilder.control(this.price, [Validators.required]),
      imageLink: this.formBuilder.control(this.imageLink, [Validators.required])
    })
  }

  addItem() {
    const item = new Item(this.addItemForm.value['name'], this.addItemForm.value['price'], this.addItemForm.value['imageLink']);
    this.is.create(item);
  }
}
