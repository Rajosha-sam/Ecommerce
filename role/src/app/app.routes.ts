import { Routes } from '@angular/router';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { LoginComponent } from './login/login.component';
import { SignuploginComponent } from './signuplogin/signuplogin.component';
import { AdminComponent } from './admin/admin.component';
import { SellerComponent } from './seller/seller.component';
import { CustomerComponent } from './customer/customer.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { ProductComponent } from './product/product.component';
import { RoleComponent } from './role/role.component';
import { AddroleComponent } from './addrole/addrole.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewroledetailsComponent } from './viewroledetails/viewroledetails.component';
import { ViewCartComponent } from './viewcart/viewcart.component';
import { ViewcustomerproductComponent } from './viewcustomerproduct/viewcustomerproduct.component';
import {  ProductdetailsComponent } from './productdetails/productdetails.component';
import { WishlistComponent } from './wishlist/wishlist.component';


export const routes: Routes = [
    // {path:'',component:LoginComponent},
    {path:'',component:HomepageComponent},
    {path:'login',component:LoginComponent},
    {path:'viewlist',component:ViewlistComponent},
    {path:'adduser',component:SignuploginComponent},
    {path:'admin',component:ViewlistComponent},
    {path:'customer',component:CustomerComponent},
    {path:'seller',component:ViewproductComponent},
    {path:'edit/:id',component:SignuploginComponent},
    {path:'goback',component:LoginComponent},
    {path:'sign',component:SignuploginComponent},
    {path:'viewproduct',component:ViewproductComponent},
    {path:'product',component:ProductComponent},
    {path:'editt/:id',component:ProductComponent},
    {path:'viewlistt',component:ViewproductComponent},
    {path:'addrole',component:RoleComponent},
    {path:'addrolee',component:AddroleComponent},
    { path: 'viewroledetails/:id', component: ViewroledetailsComponent },
    { path: 'viewcart', component: ViewCartComponent },
    {path:'viewcustomerproduct',component:ViewcustomerproductComponent},
    {path:'productdetails/:id',component:ProductdetailsComponent},
    {path:'back',component:ViewcustomerproductComponent},
    {path:'wishlist',component:WishlistComponent}

      
   
];
