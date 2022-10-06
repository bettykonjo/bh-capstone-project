const { verify } = require('jsonwebtoken');
const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken');
const router = require('express').Router();

// create opiratine

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  // admin only can add  a new product
  const newProduct = new Product(req.body);
  try {
    const savedProudct = await newProduct.save();
    res.status(200).json(savedProudct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELATE The Product
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('product has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// get product
// everyone can see the product
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all products
// everyone can futch the prodat
router.get('/', async (req, res) => {
  // we can featch the prodact by catigory or new createdUpdate
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
