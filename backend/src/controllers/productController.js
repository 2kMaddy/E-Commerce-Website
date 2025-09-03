import mongoose from "mongoose";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      category,
      subCategory,
      image,
      stock,
    } = req.body;
    const newProduct = new Product({
      productName,
      description,
      price,
      category,
      subCategory,
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
    const { page, limit } = req.query;

    // If pagination is not requested, return all products
    if (!page && !limit) {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        message: "All products fetched successfully",
        data: products,
      });
    }

    // Parse pagination parameters
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 12;

    const skip = (pageNumber - 1) * limitNumber;

    // Fetch paginated results
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Product.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Products fetched with pagination",
      data: products,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      description,
      price,
      category,
      subCategory,
      image,
      stock,
    } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        productName,
        description,
        price,
        category,
        subCategory,
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
    const { userId, userName, comment, rating } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const newReview = {
      userId,
      userName,
      comment,
      rating,
    };
    console.log(newReview);

    // if (product.reviews.some((review) => review.userId === userId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "You have already reviewed this product, If you want to update your review, please use the update review endpoint.",
    //   });
    // } else {
    // }
    product.reviews.push(newReview);
    product.ratings = Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
    );

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
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
    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    } else {
      const { reviews } = product;
      console.log("Reviews:", reviews);
      const updateReview = reviews.find(
        (review) =>
          review.userId.toString() === userId &&
          review._id.toString() === reviewId
      );
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

export const deleteMultiProducts = async (req, res) => {
  try {
    const { idList } = req.body;
    const deleteProducts = await Promise.all(
      idList.map((productId) => Product.findByIdAndDelete(productId))
    );
    res.status(200).json({
      success: true,
      message: "Products deleted successfully",
      data: deleteProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete products",
      error: error.message,
    });
  }
};

export const addBulkProducts = async (req, res) => {
  try {
    const { products } = req.body; // products should be an array of product objects
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products provided for bulk add",
      });
    }
    const createdProducts = await Product.insertMany(products);
    res.status(201).json({
      success: true,
      message: "Bulk products added successfully",
      data: createdProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add bulk products",
      error: error.message,
    });
  }
};

export const getLatestProduct = async (req, res) => {
  try {
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10);
    if (!latestProducts || latestProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No latest products found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Latest products fetched successfully",
      data: latestProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest products",
      error: error.message,
    });
  }
};

export const getProductsByFilters = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = {};
    if (category) filter.category = category;

    let products;
    products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for the given filters",
      });
    }
    const total = await Product.countDocuments();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      currentPage: page,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
