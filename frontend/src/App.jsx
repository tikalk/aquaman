import React, { Component } from 'react';
import { observer } from 'mobx-react';

import EnterScreen from './EnterScreen';
import store from './store';
import Game from './Game';

@observer
class App extends Component {
  render() {
    return <div>
      {store.game
        ? <Game store={store} />
        : <EnterScreen store={store} />}
    </div>;
  }
}

export default App;
