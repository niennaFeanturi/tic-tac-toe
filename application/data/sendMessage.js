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
      Body: { 
        Text: {
          Data: message,
        }
      },
      Subject: { 
        Data: 'TicTacToe!', 
      }
    },
    Source: 'rudenki@wwu.edu',
  };

  return ses.sendEmail(params).promise();
};
module.exports = sendMessage;
