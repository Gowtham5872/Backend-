const express = require('express');
const router = express.Router();
const profileController = require('../controller/profilecontroller');

router.get('/profile', profileController.getUserProfile);
router.post('/profile/update', profileController.updateUserProfile);
router.delete('/profile/delete', profileController.deleteUserProfile); 

module.exports = router;



