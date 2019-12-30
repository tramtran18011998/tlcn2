import { Component, OnInit } from '@angular/core';
import { User } from '../corecontrol/models/user';
import { TokenStorageService } from '../corecontrol/auth/token-storage.service';
import { UserService } from '../corecontrol/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkLogin = false;
  quantitycart: any = JSON.parse(localStorage.getItem('quantitycart'));
  //user: User = JSON.parse(localStorage.getItem('currentuser'));
  user: User = new User();
  //currentName: string= this.user.name;
  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    //localStorage.setItem('inLogin', 'false');
    console.log(this.quantitycart);
    console.log(this.checkLogin);
    if(localStorage.getItem('currentuser')!=null){
      this.user = JSON.parse(localStorage.getItem('currentuser'));
    }
    if(localStorage.getItem('token')!=null){
      this.checkLogin = true;
    }

    this.getCurrentUser();
    // if(localStorage.getItem('quantitycart')!=null){
    //   this.quantitycart = JSON.parse(localStorage.getItem('quantitycart'));
    // }
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
    if(localStorage.getItem('token')){
      this.userService.getUserme().subscribe(data => {
        console.log(data);
        this.user = data;
      })
    }
    
  }

}
