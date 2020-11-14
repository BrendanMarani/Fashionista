import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(protected formBuilder: FormBuilder, protected us: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  username: string = '';

  deleteUserForm: FormGroup;

  createForm() {
    this.deleteUserForm = this.formBuilder.group( { //need to define children under group myform
      username: this.formBuilder.control('', [Validators.required]),
    })
  }

  deleteUser() {
    this.us.delete(this.deleteUserForm.value['username']);
  }

}
