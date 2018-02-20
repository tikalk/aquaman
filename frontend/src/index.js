import {auth, initializeApp} from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBVM_c2ZYmUB3QLoSGRQs-uoXuFzGymw30",
  authDomain: "aquaman-195807.firebaseapp.com",
  databaseURL: "https://aquaman-195807.firebaseio.com",
  projectId: "aquaman-195807",
  storageBucket: "aquaman-195807.appspot.com",
  messagingSenderId: "372713300345"
};

initializeApp(config);

const provider = new auth.GoogleAuthProvider();


auth().onAuthStateChanged(user => {
  if(user) {
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

