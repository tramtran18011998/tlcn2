import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-oauth2-redirect-handler',
  templateUrl: './oauth2-redirect-handler.component.html',
  styleUrls: ['./oauth2-redirect-handler.component.css']
})
export class OAuth2RedirectHandlerComponent implements OnInit {

  //name;
  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private tokenService: TokenStorageService,private userService: UserService) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      //console.log(token); // Print the parameter to the console. 
      this.tokenService.saveToken(token);
        localStorage.setItem('token', token);
        console.log(token);
        localStorage.setItem('inSocial','1');
        //location.replace('');
        this.router.navigate['/login'];
        if(localStorage.getItem('token')){
          this.userService.getUserme().subscribe(data => {
            console.log(data);
          })
          location.replace('');
        }
  });

    // const routeFragment: Observable<string> = this.activatedRoute.fragment;
    // routeFragment.pipe(map(fragment => fragment)).subscribe(fragment => {
    //   let f = fragment.match(/^(.*?)&/);
    //   console.log(f);
    //   // ở đây vì sao chưa được gọi z
      
    //   if (f) {
    //     let token: string = f[1].replace('access_token=', '');
    //     this.tokenService.saveToken(token);
    //     localStorage.setItem('token', token);
    //     console.log(token);
    //     location.replace('');
    //   }
      // let token: string = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
      // this.tokenService.saveToken(token);
    
    
  }
  // getUrlParameter(name) {
  //   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  //   var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

  //   var results = regex.exec(this.props.location.search);
  //   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  // };

// render() {        
//     const token = this.getUrlParameter('token');
//     const error = this.getUrlParameter('error');

//     if(token) {
//         localStorage.setItem('token', token);
//         location.replace('') ;
//     } else {
//         location.replace('/login');
//     }
// }

}
