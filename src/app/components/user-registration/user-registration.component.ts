import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected us: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  username: string = '';
  password: string = '';

  registerForm: FormGroup;

  createForm() {
    this.registerForm = this.formBuilder.group( { //need to define children under group myform
      username: this.formBuilder.control(this.username, [Validators.required]),
      password: this.formBuilder.control(this.password, [Validators.required])
    })
  }

  registerUser() {
    const user = new User(this.registerForm.value['username'], this.registerForm.value['password']);
    this.us.create(user);
    this.router.navigate(['/', 'login']);
  }
}
