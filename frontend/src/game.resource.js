import axios from 'axios';
import data from './aquaman-195807-export';

const url = 'https://us-central1-aquaman-195807.cloudfunctions.net';

const get = (id) => axios.get(`${url}/game/${id}`);
// const get = (id) => Promise.resolve(data.games[id] && data.games[id] || {});

export { get };
