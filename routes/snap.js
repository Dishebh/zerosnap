const express = require('express');
const Snap = require('../models/Snap');

const router = express.Router();

router.get('/snaps', async (req, res) => {
  try {
    const snaps = await Snap.find({}).sort({ createdAt: -1 }).limit(100);

    res.status(200).send(snaps);
  } catch (error) {
    console.error('error', error);
    res.status(500).send('server error');
  }
});

router.get('/snap/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const snap = await Snap.findById(id);

    res.status(200).send(snap);
  } catch (error) {
    console.error('error', error);
    res.status(500).send('server error');
  }
});

router.post('/snap', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const { name, profilePic } = req.user;

    const newSnap = new Snap({
      name,
      profilePic,
      imageUrl,
    });

    const snap = await newSnap.save();

    res.status(200).send(snap);
  } catch (error) {
    console.error('error', error);
    res.status(500).send('server error');
  }
});

router.put('/snap/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const snap = await Snap.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      { new: true }
    );

    res.status(200).send(snap);
  } catch (error) {
    console.error('error', error);
    res.status(500).send('server error');
  }
});

module.exports = router;
