import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/entities/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected is: ItemService) { }

  ngOnInit(): void {
    this.createForm();
  }

  cname: string = '';
  nname: string = '';
  nprice: string = '';
  nimageLink: string = '';

  updateItemForm: FormGroup;

  createForm() {
    this.updateItemForm = this.formBuilder.group( { //need to define children under group myform
      cname: this.formBuilder.control(this.cname, [Validators.required]),
      nname: this.formBuilder.control(this.nname, [Validators.required]),
      nprice: this.formBuilder.control(this.nprice, [Validators.required]),
      nimageLink: this.formBuilder.control(this.nimageLink, [Validators.required])
    })
  }

  updateItem() {
    const currentItem = this.updateItemForm.value['cname'];
    const updatedItem = new Item(this.updateItemForm.value['nname'], this.updateItemForm.value['nprice'], this.updateItemForm.value['nimageLink']);
    const itemGroup = {currentItem, updatedItem}
    this.is.update(itemGroup);
  }

}
