import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, category, image, stock } =
      req.body;
    const newProduct = new Product({
      productName,
      description,
      price,
      category,
      image,
      stock,
    });
    const savedProduct = await newProduct.save();
    if (!savedProduct) {
      return res.status(400).json({
        success: false,
        message: "Failed to create product",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: savedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    let products;
    if (productId) {
      products = await Product.findById(productId);
      if (!products) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
    } else {
      products = await Product.find().sort({ createdAt: -1 });
      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found",
        });
      }
    }
    res.status(200).json({
      success: true,
      message: "Product(s) fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product(s)",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, description, price, category, image, stock } =
      req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        productName,
        description,
        price,
        category,
        image,
        stock,
      },
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, comment, rating } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const newReview = {
      userId,
      comment,
      rating,
    };

    product.reviews.push(newReview);
    product.ratings =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { userId, comment, rating } = req.body;
    const product = await Product.find({ _id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    } else {
      const updateReview = product.reviews.find({
        _id: reviewId,
        userId: userId,
      });
      if (!updateReview) {
        return res.status(404).json({
          success: false,
          message:
            "Review not found or you are not authorized to update this review",
        });
      }
      updateReview.comment = comment;
      updateReview.rating = rating;
      product.ratings =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;
      await product.save();

      res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === reviewId && review.userId === userId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({
        success: false,
        message:
          "Review not found or you are not authorized to delete this review",
      });
    }

    product.reviews.splice(reviewIndex, 1);
    product.ratings =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      (product.reviews.length || 1);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category }).sort({
      createdAt: -1,
    });
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in this category",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products by category",
      error: error.message,
    });
  }
};
