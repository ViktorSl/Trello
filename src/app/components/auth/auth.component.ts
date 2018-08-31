import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    public dataService: DataService
  ) {
  }

  ngOnInit() {
  }

  onLogin = () => {
    const authenticationSuccess = () => {
      const token = (window as any).Trello.token();
      console.log('%c token ', 'background: #444; color: #2ECC40');
      console.log(token);

      if (token) {
        this.dataService.token = token;
        this.router.navigate(['report']);
      }
    };

    const authenticationFailure = function () {
      console.log('Failed authentication');
    };
    (window as any).Trello.authorize({
      type: 'popup',
      name: 'Trello Application',
      scope: {
        read: 'true',
        write: 'true'
      },
      expiration: 'never',
      success: authenticationSuccess,
      error: authenticationFailure
    });
  };

}
