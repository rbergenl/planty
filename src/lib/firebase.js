import firebase from 'firebase/app';
import 'firebase/auth';
import * as log from 'loglevel';

export const firebaseApp = firebase;
//export const ref = firebase.database().ref();
export const auth = firebase.auth;

const provider = new auth.GoogleAuthProvider();

export async function loginUser() {
    try {
        const result = await auth().signInWithPopup(provider);
        const userData = Object.assign({
              // The signed-in user info.
              user: result.user,
              // This gives you a Google Access Token. You can use it to access the Google API.
              token: result.credential.accessToken
          });
          log.info(userData);
          return userData;
    } catch(error) {
          return error;
    }
}
