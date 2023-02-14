require('dotenv').config();
const express = require('express');
const app = express(), port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { SendEmail } = require('./SendEmail');

let obj = {
  email: 'rayvivek779@gmail.com',
  type: 'type',
  name: 'name',
  mobile: 'mobile',
  message: 'vivek message',
}

app.get('/', async (req, res) => {
  try {
    let result = await SendEmail(obj);
    res.status(200).json({ message : "success", result });
  } catch (error) {
    res.status(500).json({ message : "failure", error });
  }
});

app.post('/', async (req, res) => {
  try {
    let result = await SendEmail(obj);
    res.status(200).json({ message : "success", result });
  } catch (error) {
    res.status(500).json({ message : "failure", error });
  }
});

app.put('/', async (req, res) => {
  try {
    let result = await SendEmail(obj);
    res.status(200).json({ message : "success", result });
  } catch (error) {
    res.status(500).json({ message : "failure", error });
  }
});

app.patch('/', async (req, res) => {
  try {
    let result = await SendEmail(obj);
    res.status(200).json({ message : "success", result });
  } catch (error) {
    res.status(500).json({ message : "failure", error });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});