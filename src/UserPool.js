import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { cognitoConfig } from './cognitoConfig';

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

console.log('UserPool created:', userPool);


export default userPool;
