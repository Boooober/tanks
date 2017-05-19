import {Component} from '@angular/core';
import {StateService} from 'ui-router-ng2';
import {AuthService} from '../auth.service';

const ACCOUNT_DOES_NOT_EXISTS_EXCEPTION = 'AccountDoesNotExistsException';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  doesNotExists = false;

  constructor(private AuthService: AuthService,
              private StateService: StateService) {
  }

  onSubmit() {
    const {email, password} = this;
    this.AuthService.login({email, password})
      .then(() => this.StateService.go('game'))
      .catch(response => {
        const error = response.json();
        if (error.type === ACCOUNT_DOES_NOT_EXISTS_EXCEPTION) {
          this.doesNotExists = true;
        }
      });
  }

  clearErrors() {
    this.doesNotExists = false;
  }
}
