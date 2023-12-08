// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk');
const ses = new AWS.SES({region: 'us-west-2'});

const sendMessage = async ({ email, message }) => {
  const params = {
    Destination: {
      BccAddresses: [],
      CcAddresses: [],
      ToAddresses: [email]
    },
    Message: { 
      Body: { /* required */
        Text: {
          Data: message,
        }
      },
      Subject: { 
        Data: 'Your Turn!', 
      }
    },
    Source: 'alexan9@wwu.edu',
  };

  return ses.sendEmail(params).promise();
};

sendMessage({ email: "alexan9@wwu.edu", message: 'Sending a message from SES!'})
  .then(() => console.log('Sent message successfully'))
  .catch((error) => console.log('Error sending SES: ', error.message))
