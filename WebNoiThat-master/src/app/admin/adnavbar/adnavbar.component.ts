import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/corecontrol/models/user';

@Component({
  selector: 'app-adnavbar',
  templateUrl: './adnavbar.component.html',
  styleUrls: ['./adnavbar.component.css']
})
export class AdnavbarComponent implements OnInit {

  user: User = new User();
  checkLogin = false;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('currentuser')!=null){
      this.user = JSON.parse(localStorage.getItem('currentuser'));
    }
    if(localStorage.getItem('token')!=null){
      this.checkLogin = true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
    localStorage.removeItem('quantitycart');
    localStorage.setItem('inLogin','false');
    location.replace('');
  }

}
