import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdProductSeeComponent } from './admin/admin-product/ad-product-see/ad-product-see.component';
import { AdProductEditComponent } from './admin/admin-product/ad-product-edit/ad-product-edit.component';
import { AdProductAddComponent } from './admin/admin-product/ad-product-add/ad-product-add.component';

import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { AdCustomerSeeComponent } from './admin/admin-customer/ad-customer-see/ad-customer-see.component';
import { AdCustomerEditComponent } from './admin/admin-customer/ad-customer-edit/ad-customer-edit.component';
import { AdCustomerAddComponent } from './admin/admin-customer/ad-customer-add/ad-customer-add.component';
import { AdminSupplierComponent } from './admin/admin-supplier/admin-supplier.component';
import { AdSupplierAddComponent } from './admin/admin-supplier/ad-supplier-add/ad-supplier-add.component';
import { AdSupplierEditComponent } from './admin/admin-supplier/ad-supplier-edit/ad-supplier-edit.component';
import { AdSupplierSeeComponent } from './admin/admin-supplier/ad-supplier-see/ad-supplier-see.component';
import { AdminWorkerComponent } from './admin/admin-worker/admin-worker.component';
import { AdWorkerSeeComponent } from './admin/admin-worker/ad-worker-see/ad-worker-see.component';
import { AdWorkerEditComponent } from './admin/admin-worker/ad-worker-edit/ad-worker-edit.component';
import { AdWorkerAddComponent } from './admin/admin-worker/ad-worker-add/ad-worker-add.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdCategoryEditComponent } from './admin/admin-category/ad-category-edit/ad-category-edit.component';
import { AdCategoryAddComponent } from './admin/admin-category/ad-category-add/ad-category-add.component';
import { AdminReceiptComponent } from './admin/admin-receipt/admin-receipt.component';
import { AdReceiptSeeComponent } from './admin/admin-receipt/ad-receipt-see/ad-receipt-see.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdProfileEditComponent } from './admin/admin-profile/ad-profile-edit/ad-profile-edit.component';
import { AdAdminAccComponent } from './admin/admin-profile/ad-admin-acc/ad-admin-acc.component';
import { AdProfileAddComponent } from './admin/admin-profile/ad-profile-add/ad-profile-add.component';
import { AdReceiptEditComponent } from './admin/admin-receipt/ad-receipt-edit/ad-receipt-edit.component';
import { OAuth2RedirectHandlerComponent } from './corecontrol/auth/oauth2-redirect-handler/oauth2-redirect-handler.component';
import { CarthistoryComponent } from './carthistory/carthistory.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'oauth2/redirect', component: OAuth2RedirectHandlerComponent},
  {path: 'productdetail/:id', component: ProductpageComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'carthistory/:id', component: CarthistoryComponent},


  //{path: 'admin', component: AdminComponent},
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: '/adproduct', pathMatch: 'full' },
      { path: 'adproduct', component: AdminProductComponent },
      { path: 'adproduct/detail/:id', component: AdProductSeeComponent },
      { path: 'adproduct/edit/:id', component: AdProductEditComponent },
      { path: 'adproduct/add', component: AdProductAddComponent },

      { path: 'adcategory', component: AdminCategoryComponent },
      { path: 'adcategory/edit/:id', component: AdCategoryEditComponent },
      { path: 'adcategory/add', component: AdCategoryAddComponent },


      { path: 'adcustomer', component: AdminCustomerComponent },
      { path: 'adcustomer/detail/:id', component: AdCustomerSeeComponent },
      { path: 'adcustomer/edit/:id', component: AdCustomerEditComponent },
      { path: 'adcustomer/add', component: AdCustomerAddComponent },

      { path: 'adworker', component: AdminWorkerComponent },
      { path: 'adworker/detail/:id', component: AdWorkerSeeComponent },
      { path: 'adworker/edit/:id', component: AdWorkerEditComponent },
      { path: 'adworker/add', component: AdWorkerAddComponent },

      { path: 'adsupplier', component: AdminSupplierComponent },
      { path: 'adsupplier/detail/:id', component: AdSupplierSeeComponent },
      { path: 'adsupplier/edit/:id', component: AdSupplierEditComponent },
      { path: 'adsupplier/add', component: AdSupplierAddComponent },

      { path: 'adreceipt', component: AdminReceiptComponent },
      { path: 'adreceipt/detail/:id', component: AdReceiptSeeComponent },
      { path: 'adreceipt/edit/:id', component: AdReceiptEditComponent },
      
      
      { path: 'adminprofile/:id', component: AdminProfileComponent },
      { path: 'adminprofile/edit/:id', component: AdProfileEditComponent },
      { path: 'adminprofilea', component: AdAdminAccComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
