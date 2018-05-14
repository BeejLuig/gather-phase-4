const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res) => {
  res.render('create');
});

router.post('/items/:id/delete', async (req, res) => {
  await Item.deleteOne({ _id: req.params.id });
  res.redirect('/');
});

router.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    res.render('item', {item});
  } else {
    res.status(404).send();
  }
});


router.post('/items/create', async (req, res) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }
});

module.exports = router;
