import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './components/user-home-page/user-home-page.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomePageComponent,
    UserHomePageComponent,
    UserNavComponent,
    AdminNavComponent,
    UserRegistrationComponent,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    AddItemComponent,
    DeleteItemComponent,
    UpdateItemComponent,
    ShoppingCartComponent,
    WishListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
