import React from 'react';
import { observer } from 'mobx-react';

function EnterScreen({ store: { onSubmit, setState, disabled, game } }) {
  return <div>
    <form noValidate onSubmit={onSubmit}>
      <input
        type="text"
        onChange={e => setState({ pin: e.target.value })}
      />
      <button disabled={disabled}>Enter Pin</button>
    </form>

    {JSON.stringify(game)}
  </div>;
}

export default observer(EnterScreen);
