import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected us: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  cusername: string = '';
  cpassword: string = '';
  nusername: string = '';
  npassword: string = '';

  updateUserForm: FormGroup;

  createForm() {
    this.updateUserForm = this.formBuilder.group( { //need to define children under group myform
      cusername: this.formBuilder.control(this.cusername, [Validators.required]),
      cpassword: this.formBuilder.control(this.cpassword, [Validators.required]),
      nusername: this.formBuilder.control(this.nusername, [Validators.required]),
      npassword: this.formBuilder.control(this.npassword, [Validators.required])
    })
  }

  updateUser() {
    //retrieve both users form the form
    const currentUser = new User(this.updateUserForm.value['cusername'], this.updateUserForm.value['cpassword']);
    const updatedUser = new User(this.updateUserForm.value['nusername'], this.updateUserForm.value['npassword']);
    //add users to group and send object
    const userGroup = {currentUser, updatedUser}
    this.us.update(userGroup);
  }
}
