const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const { PORT } = require('./config');
const { BASE_SERVER_PATH } = require('./config');
const cors = require('cors');

const app = express();
const api = express.Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json());
app.use(BASE_SERVER_PATH, api)

api.get('/', (req, res) => {
  res.send(JSON.stringify(req));
});

api.put("/login", async (req,res) => {
  const {UsernameorEmail,password} = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
      email: UsernameorEmail,
      password: password,
  });

  if (error){
      res.status(500).json(error);
  }
  else{
      res.status(200).json({data, message : "User logined successfully"});
  }
});

api.post("/register", async (req, res) => {
  const {  email, username, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
          data: {
              username: username,
          }
      }
  });

  if (error) {
      res.status(500).json(error);
  } else {
      res.status(200).json({ message: "User go to verify page" });
  }
});

api.put('/verify-otp', async (req, res) => {
  try {
    const {email,otp} = req.body;
  
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });
  
    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (error) {
    if(error.message.includes('invalid') || error.message.includes('expired')){
      res.status(200).json({ error: 'OTP has invalid or expired' });
    }else{
    console.log(error);
    res.status(500).json({ error: 'An error occurred while verifying OTP' });
    }
  }
});

//-----------------------------superapp home page-----------------------------------

api.post('/recommended-blog', async (req, res) => {
  try {
    const { data, error } = await supabase
    .from('randomblog') 
    .select('blog_id,title,category,body,blogger,date,cover_img')
    // .limit(3);
    if (error) {
        throw error;
    } else {
        res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

api.post('/recommended-product', async (req,res) => {
  try {
    const { data, error } = await supabase.from('product').select('*');
    const MaxRecommended = req.body.MaxRecommended || 3;

    if (error) {
      throw error;
    }else{
      const randomProduct = (Count) => {
        let newData = [];
        for(let i=0; i < Count ; i++){
          let randomNumber = Math.floor(Math.random() * data.length);
          newData[i] = data[randomNumber];
          data.splice(randomNumber,1);
        }
        return newData;
      }
      res.status(200).json(randomProduct(MaxRecommended));
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});