const productModel = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: 'Name is required' });
      case !description:
        return res.status(400).send({ error: 'Description is required' });
      case !price:
        return res.status(400).send({ error: 'Price is required' });
      case !category:
        return res.status(400).send({ error: 'Category is required' });
      case !quantity:
        return res.status(400).send({ error: 'Quantity is required' });
      case photo && photo.size > 1000000: // 1MB
        return res.status(400).send({ error: 'Photo should be less than 1MB' });
    }

    const product = new productModel({...req.fields, slug:slugify(name)});
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in creating product',
      error,
    });
  }
};

module.exports = createProductController;
