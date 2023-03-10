const { Router } = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');

dotenv.config();

const router = Router();

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL,
  secret: process.env.secret,
};

router.use(auth(authConfig));

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/login', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
});

router.get('/aboutme', (req, res) => {
  res.send('This is a page about me!');
});

router.get('/discoveramagicalworldofpotatoes', (req, res) => {
  res.send('Welcome to the magical world of potatoes!');
});

// export default router;
module.exports = router;