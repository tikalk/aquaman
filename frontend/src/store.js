import { observable, action, computed, runInAction } from 'mobx';

import user from './user';
import logIn from './auth';
import { get } from './game.resource';

class Start {
  @observable pin = '';
  @observable disabled = false;
  @observable game;

  @action setState = state => Object.assign(this, state);

  @action onSubmit = e => {
    e.preventDefault();
    this.disabled = true;

    if (!user.loggedIn) {
      return logIn().then(() => get(this.pin)
        .then(({ data: { game } }) => {
          runInAction(() => {
            this.setState({ game });
            this.disabled = false;
          });
        })
        .catch(() => {
          runInAction(() => {
            this.disabled = false;
          });
        }),
      );
    }
  };
}

export default new Start();
