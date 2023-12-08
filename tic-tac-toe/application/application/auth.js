// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const config = require("./config");

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const client = jwksClient({
  strictSsl: true, // Default value
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`
});

const createCognitoUser = async (username, password, email, phoneNumber) => {
  const signUpParams = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email
      },
      {
        Name: "phone_number",
        Value: phoneNumber
      }
    ]
  };
  await cognitoidentityserviceprovider.signUp(signUpParams).promise();
  const confirmParams = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: username
  };
  await cognitoidentityserviceprovider.adminConfirmSignUp(confirmParams).promise();
  return {
    username,
    email,
    phoneNumber
  };
};

const login = async (username, password) => {
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    UserPoolId: process.env.USER_POOL_ID,
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  };
  const {
    AuthenticationResult: { IdToken: idToken }
  } = await cognitoidentityserviceprovider.adminInitiateAuth(params).promise();
  console.log("HELLO");
   process.env.LOGGED_IN_ID_TOKEN = idToken;
  return idToken;
};

const fetchUserByEmail = async (email) => {
  const params = {
    UserPoolId: config.USER_POOL_ID,
    Filter: `email = "${email}"`,
    Limit: 1,
  };

  try {
    const users = await cognitoidentityserviceprovider.listUsers(params).promise();

    if (users.Users && users.Users.length > 0) {
      const user = users.Users[0];
      const username = user.Username;
      const userEmail = user.Attributes.find((attribute) => attribute.Name === 'email').Value;

      return {
        username,
        email: userEmail,
      };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const verifyToken = async idToken => {
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      var signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return new Promise((res, rej) => {
    jwt.verify(idToken, getKey, {}, function(err, decoded) {
      if (err) {
        rej(err);
      }
      res(decoded);
    });
  });
};

module.exports = {
  createCognitoUser,
  login,
  fetchUserByEmail,
  verifyToken
};
