import { observable, action, computed, runInAction } from 'mobx';

class User {
  @observable loggedIn = false;
  @observable email;
  @observable displayName;

  @action setState = state => Object.assign(this, state);
}

export default new User();
