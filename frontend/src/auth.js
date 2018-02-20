import { auth } from 'firebase/app';

const provider = new auth.GoogleAuthProvider();

export default () => auth()
  .signInWithPopup(provider);
