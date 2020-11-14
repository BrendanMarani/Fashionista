import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserHomePageComponent } from './components/user-home-page/user-home-page.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { LoginAuthenticateGuard } from './guards/login-authenticate.guard';

const routes: Routes = [
  {path:'user', component:UserNavComponent},
  {path:'login', component:LoginPageComponent},
  {path:'user-registration', component:UserRegistrationComponent},
  {path:'user', component:UserNavComponent,
    children: [
      {path:'user-home', component:UserHomePageComponent},
      {path:'shopping-cart', component:ShoppingCartComponent},
      {path:'wish-list', component:WishListComponent},
      {path:'', redirectTo: 'user-home', pathMatch: 'full'}
    ]},
  {path:'admin', component:AdminNavComponent, 
    children: [
      {path:'adduser', component:AddUserComponent},
      {path:'deleteuser', component:DeleteUserComponent},
      {path:'updateuser', component:UpdateUserComponent},
      {path:'additem', component:AddItemComponent},
      {path:'updateitem', component:UpdateItemComponent},
      {path:'deleteitem', component:DeleteItemComponent},
      {path:'', redirectTo: 'adduser', pathMatch: 'full'}
    ]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//canActivate: [LoginAuthenticateGuard]}