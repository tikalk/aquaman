import { observable, action, computed, runInAction } from 'mobx';

import { get } from './game.resource';

class Start {
  @observable pin = '';
  @observable disabled = false;
  @observable game;

  @action setState = state => Object.assign(this, state);

  @action onSubmit = e => {
    e.preventDefault();
    this.disabled = true;

    get(this.pin)
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
      });
  };
}

export default new Start();
