import { Component, OnInit } from '@angular/core';
import { User } from '../corecontrol/models/user';
import { TokenStorageService } from '../corecontrol/auth/token-storage.service';

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
  constructor(private token: TokenStorageService) { }

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

    // if(localStorage.getItem('quantitycart')!=null){
    //   this.quantitycart = JSON.parse(localStorage.getItem('quantitycart'));
    // }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
    localStorage.removeItem('quantitycart');
    localStorage.setItem('inLogin','false');
    location.replace('');
    this.token.signOut();

  }

  ngDoCheck(){
    
  }

}
