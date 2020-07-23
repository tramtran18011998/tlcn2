import { Router } from '@angular/router';
import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../corecontrol/models/user';
import { TokenStorageService } from '../corecontrol/auth/token-storage.service';
import { UserService } from '../corecontrol/services/user.service';
import { CartService } from '../corecontrol/services/cart.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public searchHeader=new EventEmitter();
  checkLogin = false;
  quantitycart: any = JSON.parse(localStorage.getItem('quantitycart'));
  //user: User = JSON.parse(localStorage.getItem('currentuser'));
  user: User = new User();
  //currentName: string= this.user.name;
  inSocial: any;
  public value="";

  constructor(private token: TokenStorageService, private router: Router,private userService: UserService, private cartService: CartService) { }

  ngOnInit() {
    //localStorage.setItem('inLogin', 'false');
    console.log(this.quantitycart);
    console.log(this.checkLogin);
    if(localStorage.getItem('currentuser')!=null){
      this.user = JSON.parse(localStorage.getItem('currentuser'));
      if(!this.quantitycart){
        this.cartService.countQuantity(this.user.id).subscribe(x => {
          this.quantitycart = x;
          localStorage.setItem('quantitycart', this.quantitycart.toString());
        })
      }
      
    }
    if(localStorage.getItem('token')!=null){
      this.checkLogin = true;
    }

    this.getCurrentUser();

  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
    localStorage.removeItem('quantitycart');
    localStorage.removeItem('inSocial');
    localStorage.setItem('inLogin','false');
    location.replace('');
    this.token.signOut();

  }

  getCurrentUser(){
    this.inSocial = JSON.parse(localStorage.getItem('inSocial'));

    if(localStorage.getItem('token')){
      this.userService.getUserme().subscribe(data => {
        console.log(data);
        this.user = data;
        if(!this.quantitycart){
          this.cartService.countQuantity(this.user.id).subscribe(x => {
            this.quantitycart = x;
            localStorage.setItem('quantitycart', this.quantitycart.toString());
          })
        }
      })
    }
    
  }
  showAccMenu(){
    let x=document.getElementById("accMenu");
    if(x.style.display=="none"){
      x.style.display="block";
    }
    else
    x.style.display="none";
  }
  navigateSearch(value){
    localStorage.setItem("searchval",value);
    this.router.navigate(['product']);
  }

}
