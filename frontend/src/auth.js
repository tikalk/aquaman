import { auth } from 'firebase/app';

const provider = new auth.GoogleAuthProvider();

auth().onAuthStateChanged(user => {
  if (user) {
    document.write(`Hi ${user.displayName}`);
    return;
  }

  const button = document.createElement('button');
  button.innerText = 'Sign In';
  button.onclick = () => {
    auth()
      .signInWithPopup(provider)
      .catch(console.error);
  };

  document.body.appendChild(button);

});
