import firebase from 'firebase/app';
import 'firebase/auth';

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
            given_name: result.additionalUserInfo.profile.given_name,
            // This gives you a Google Access Token. You can use it to access the Google API.
            token: result.credential.accessToken,
            result: result
        });
        return userData;
    } catch(error) {
        return error;
    }
}

export async function logoutUser() {
    try {
        const result = firebase.auth().signOut();
        return result;
    } catch(error) {
        return error;
    }
}