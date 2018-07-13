import appConfig from './app.json';
import firebaseConfig from './firebase.json';

export default { 
    firebase: firebaseConfig.result,
    logLevel: appConfig.LogLevel,
    awsCognitoUserPoolId: appConfig.awsCognitoUserPoolId,
    awsCognitoUserPoolAppClientId: appConfig.awsCognitoUserPoolAppClientId,
    awsRegion: appConfig.awsRegion,
    awsCognitoIdentityPoolId: appConfig.awsCognitoIdentityPoolId,
    mqttDebugLevel: appConfig.mqttDebugLevel,
    awsIotHost: appConfig.awsIotHost,
    awsApiGatewayInvokeUrl: appConfig.awsApiGatewayInvokeUrl
};