import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected us: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  username: string = '';
  password: string = '';

  addUserForm: FormGroup;

  createForm() {
    this.addUserForm = this.formBuilder.group( { //need to define children under group myform
      username: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    })
  }

  addUser() {
    const user = new User(this.addUserForm.value['username'], this.addUserForm.value['password']);
    this.us.create(user);
  }
}
