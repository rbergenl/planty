import appConfig from './app.json';
import firebaseConfig from './firebase.json';

export default { 
    logLevel: appConfig.LogLevel,
    firebase: firebaseConfig.result
};