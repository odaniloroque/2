const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.create);

module.exports = router;

// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('API is running!');
// });

// module.exports = router;
