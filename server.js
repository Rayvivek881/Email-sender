require('dotenv').config();
const express = require('express');
const app = express(), port = process.env.PORT || 5000;
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { SendEmail } = require('./SendEmail');
const cors = require('cors');
app.use(cors());

let obj = {
  email: 'rayvivek779@gmail.com',
  type: 'type',
  name: 'name',
  mobile: 'mobile',
  message: 'vivek message from sender', 
}

const CLIENT_ID = `383926281252-0f87fot0bj5jm2oa65hg4s8avtrpgmue.apps.googleusercontent.com`;
const CLIENT_SECRET = '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';
const REDIRECT_URI = `https://google.com`;
const ACCESS_TOKEN = `ya29.a0AVvZVsoyOQ3tNJnYIXz4gUIazRsFigNaylsZgRrUP1JhL5VJBx_uPJCLNyRg0KbxcCo0pJroFSeWs3KUiw8STUVah_XrTCF8a34_4aSY-hPyQcXmqFAmxC3trVAG4vUJW_ZMHxOx2ZpSwbMQTE7RtpKzZtsTaCgYKAZcSARESFQGbdwaIP5EMAPOpuSg9ZdW1K_pEWQ0163`
let REFRESH_TOKEN = `1//0gOwD8R-jAaRmCgYIARAAGBASNwF-L9IrWJ6no-kBDdRzFXMy8Y3sp56Z2RFxe_fz3mxVvui5Mf7h-fRnBDt9Kp2nUqAj7A8YQmQ`

const getAccessToken = async (req, res) => {
  try {
    const { tokens } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(tokens);
    return tokens.refresh_token;
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}


app.get('/', async (req, res) => {
  try {
    let result = await SendEmail(obj);
    return res.status(200).json({ message : "success" }); 
  } catch (error) {
    res.status(500).json({ message : "failure", error });
  }
});

app.post('/', async (req, res) => {
  try {
    console.log("---------------------------------------------------------------------------------------------");
    const oAuth2Client = new OAuth2Client( CLIENT_ID, CLIENT_SECRET, REDIRECT_URI );
    oAuth2Client.setCredentials({ 
      refresh_token: REFRESH_TOKEN,
      access_token: ACCESS_TOKEN,
    });
    let result = await oAuth2Client.refreshAccessToken();
    const { messageId } = req.body.message;
    console.log("messageId vivek", req.body);
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const message = await gmail.users.messages.get({ userId: 'me', id: messageId });
    console.log("message vivek", message);
    return res.status(200).json({ message : "success" });
  } catch (error) {
    console.log("error vivek", error);
    res.status(500).json({ message : "failure", error });
  }
  console.log("---------------------------------------------------------------------------------------------");
});

app.put('/', async (req, res) => {
  try {
    let result = await SendEmail(obj);
    return res.status(200).json({ message : "success" });
  } catch (error) {
    res.status(500).json({ message : "failure", error });
  }
});

app.patch('/', async (req, res) => {
  try {
    let result = await SendEmail(obj);
    return res.status(200).json({ message : "success" });
  } catch (error) {
    res.status(500).json({ message : "failure", error });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
