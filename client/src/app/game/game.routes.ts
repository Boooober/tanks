import {StateService} from 'ui-router-ng2';
import {GameComponent} from './game.component';
import {AuthService} from '../auth-forms/auth.service';

export const routes = [
  {
    url: '/game',
    name: 'game',
    component: GameComponent,
    resolve: [
      {
        token: 'user',
        deps: [StateService, AuthService],
        resolveFn: resolveUsers
      }
    ]
  }
];

export function resolveUsers(StateService, AuthService) {
  const user = AuthService.getUser();
  if (user) { return user; }
  StateService.go('login');
  return Promise.reject({});
}
