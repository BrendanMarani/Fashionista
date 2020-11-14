import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/entities/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected is: ItemService) { }

  ngOnInit(): void {
    this.createForm();
  }

  name: string = '';

  deleteItemForm: FormGroup;

  createForm() {
    this.deleteItemForm = this.formBuilder.group( { //need to define children under group myform
      name: this.formBuilder.control(this.name, [Validators.required]),
    })
  }

  deleteItem() {
    this.is.delete(this.deleteItemForm.value['name']);
  }
}
