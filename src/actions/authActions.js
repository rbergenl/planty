var AWS = require('aws-sdk');
import Config from '../config';

import * as Firebase from '../lib/firebase';
import * as log from 'loglevel';
import history from '../lib/history';
import * as Cognito from '../lib/aws-cognito';
import * as ApiGateway from '../lib/aws-api-gateway';
import * as IoT from '../lib/aws-iot';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  LOGGED_IN_STATUS_CHANGED
} from '../actions';



    
const loginUserProvider = (provider, profile, token) => {
//  (dispatch) => {
    //dispatch({ type: LOGIN_USER });
    console.log('im here!');
    AWS.config.region = Config.awsRegion;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
       IdentityPoolId: Config.awsCognitoIdentityPoolId
    });

    var mqttClient = IoT.initNewClient({});
    /*
    return Cognito.getAwsCredentials(token, provider)
      .then((awsCredentials) => {
        // Add a username: key set as the identity's email
        const userObj = Object.assign({ username: profile.email }, profile);
        //loginUserSuccess(dispatch, userObj, awsCredentials, provider, token);
        log.info(userObj)
        
        
        //ApiGateway.attachConnectPolicy().then((res) => {
        //  console.log(res)
        //});
        
        
        //IoT.initNewClient(awsCredentials);
        
      })
      .catch((error) => {
        log.error(error);
        //loginUserFail(dispatch, error.message);
      }); */
//  }

  var cognitoIdentity = new AWS.CognitoIdentity();
  AWS.config.credentials.get(function(err, data) {
     if (!err) {
        console.log('retrieved identity: ' + AWS.config.credentials.identityId);
        var params = {
           IdentityId: AWS.config.credentials.identityId
        };
        cognitoIdentity.getCredentialsForIdentity(params, function(err, data) {
           if (!err) {
              //
              // Update our latest AWS credentials; the MQTT client will use these
              // during its next reconnect attempt.
              //
              IoT.updateClientCredentials({
                accessKeyId: data.Credentials.AccessKeyId,
                secretAccessKey: data.Credentials.SecretKey,
                sessionToken: data.Credentials.SessionToken
              });
              
              IoT.publish('publish-topic', 'haha jaaa')
              
              /*
              mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
                 data.Credentials.SecretKey,
                 data.Credentials.SessionToken);
                 */
           } else {
              console.log('error retrieving credentials: ' + err);
              alert('error retrieving credentials: ' + err);
           }
        });
     } else {
        console.log('error retrieving identity:' + err);
        alert('error retrieving identity: ' + err);
     }
  });

};

export const loginUser = () => {
    return async (dispatch) => {
        try {
          // get the user
          const user = await Firebase.loginUser();
          log.info(user);
          dispatch({ type: LOGIN_USER_SUCCESS, user });
          // store the authentication status
          sessionStorage.setItem('isLoggedIn', 'true');
          //verifyIfLoggedIn();
          dispatch({ type: LOGGED_IN_STATUS_CHANGED, loggedIn: true});
          
          const providerKey = 'google';
          loginUserProvider(providerKey, user.user, user.result.credential.idToken);
          
          // redirect to the root
          history.push('/');
        } catch (e) {
          dispatch({ type: LOGIN_USER_FAILED });
        }
    };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const result = await Firebase.logoutUser();
      log.info(result);
      dispatch({ type: LOGOUT_USER_SUCCESS });
       // store the authentication status
      sessionStorage.setItem('isLoggedIn', 'false');
      //verifyIfLoggedIn();
      dispatch({ type: LOGGED_IN_STATUS_CHANGED, loggedIn: false});
      // redirect to the root
      history.push('/');
    } catch (e) {
      dispatch({ type: LOGOUT_USER_FAILED });
    }
  };
};

