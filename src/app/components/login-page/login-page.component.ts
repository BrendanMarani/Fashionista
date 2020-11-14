import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private ls: LoginService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  credential;
  loginForm: FormGroup;
  username: string = '';
  password: string = '';

  STORAGE_KEY = 'username';

  createForm() {
    this.loginForm = this.formBuilder.group( { //need to define children under group myform
      username: this.formBuilder.control(this.username, [Validators.required]),
      password: this.formBuilder.control(this.password, [Validators.required])
    })
  }

  authenticateUser() {
    this.credential = {username: this.loginForm.value.username, password:this.loginForm.value.password};
    //console.log(this.credential);

    this.ls.getLogin(this.credential).subscribe(
      res => {
        if(res == null) {
          alert('Incorrect username and/or password!');
        }
        else {
          localStorage.setItem(this.STORAGE_KEY, this.credential.username);
          this.router.navigate(['/', 'user', 'user-home']);
        }
        //console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
