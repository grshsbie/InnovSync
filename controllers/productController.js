const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { productId, productName, stages } = req.body;

    try {
        const existingProduct = await Product.findOne({ productId });
        if (existingProduct) {
            return res.status(400).json({ msg: 'Product ID already exists' });
        }

        const product = new Product({
            productId,
            productName,
            stages
        });

        await product.save();
        res.status(201).json({ msg: 'Product created successfully', product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProduct = async (req, res) => {
    const { productId, productName, stages } = req.body;

    try {
        const product = await Product.findOneAndUpdate(
            { productId },
            { productName, stages },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product updated successfully', product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOneAndDelete({ productId });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
