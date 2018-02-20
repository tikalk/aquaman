import React from 'react';
import { observer } from 'mobx-react';

const Question = observer(({ answers: [left, right], question, imageUrl, imageTitle }) => <div>
  <h2>{question}</h2>
  <button>{left}</button>
  <figure>
    <img src={imageUrl} alt={imageTitle} />
    <caption>{imageTitle}</caption>
  </figure>
  <button>{right}</button>
</div>);

function Game({ store: { game: { name, questions } } }) {
  return <div>
    <h1>{name}</h1>

    {questions.map(question => <Question {...question} />)}
  </div>;
}

export default observer(Game);
