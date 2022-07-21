const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Getting User
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:username', async (req, res) => {
    console.log("Getting User: " + req.params.username);

    try {
        const user = await User.find( { username: req.params.username });
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        tasks: req.body.tasks
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:username', getUser, async (req, res) => {
    console.log("Updating User: " + req.params.username);
    res.user.tasks = req.body.tasks;

    try {
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getUser(req, res, next) {
    let user
    try {
      user = await User.findOne({ username: req.params.username });
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.user = user;
    next();
}


module.exports = router;