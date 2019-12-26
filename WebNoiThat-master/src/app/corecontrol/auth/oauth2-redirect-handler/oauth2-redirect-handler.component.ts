import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-oauth2-redirect-handler',
  templateUrl: './oauth2-redirect-handler.component.html',
  styleUrls: ['./oauth2-redirect-handler.component.css']
})
export class OAuth2RedirectHandlerComponent implements OnInit {

  //name;
  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private tokenService: TokenStorageService) { }

  ngOnInit() {

    const routeFragment: Observable<string> = this.activatedRoute.fragment;
    routeFragment.pipe(map(fragment => fragment)).subscribe(fragment => {
      let f = fragment.match(/^(.*?)&/);
      if (f) {
        let token: string = f[1].replace('access_token=', '');
        this.tokenService.saveToken(token);
        localStorage.setItem('token', token);
        location.replace('');
      }
      // let token: string = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
      // this.tokenService.saveToken(token);
    });
    
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
