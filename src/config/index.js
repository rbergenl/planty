import appConfig from './app.json';
import firebaseConfig from './firebase.json';

export default { 
    logLevel: appConfig.LogLevel,
    firebase: firebaseConfig.result,
    awsCognitoUserPoolId: 'us-east-1_p4eSDm9zb',
    awsCognitoUserPoolAppClientId: '6a2jfuqqug6eiralsuueu2gfus',
    awsRegion: 'us-east-1',
    //awsCognitoIdentityPoolId: 'us-east-1:6369ce99-d5bd-49da-988c-79861df2efd3',
    awsCognitoIdentityPoolId: 'us-east-1:c62c94d5-16a8-4aec-b83a-d18eec2568ef',
    mqttDebugLevel: 'debug',
    awsIotHost: 'a36bz20xtb4kpv.iot.us-east-1.amazonaws.com',
    awsApiGatewayInvokeUrl: 'https://9ltvwoxvn0.execute-api.us-east-1.amazonaws.com/dev'
};