import { prisma } from "../config/prisma.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await prisma.product.create({
      data: {
        name,
        slug: slugify(name),
        description,
        price: Number(price),
        quantity: Number(quantity),
        categoryId: Number(category),
        shipping: shipping === 'true' || shipping === true,
        photo: photo ? fs.readFileSync(photo.path) : undefined
      }
    });
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        quantity: true,
        shipping: true,
        categoryId: true,
        category: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.status(200).send({
      success: true,
      counTotal: sanitized.length,
      message: "ALlProducts ",
      products: sanitized,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug: req.params.slug },
      include: {
        category: true
      }
    });
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.pid) },
      select: { photo: true }
    });
    if (product && product.photo) {
      res.set("Content-type", 'image/*');
      return res.status(200).send(product.photo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.getProductById(Number(req.params.pid));
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    await productModel.deleteProduct(Number(req.params.pid));
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const data = { ...req.fields, slug: slugify(name), price: Number(price), quantity: Number(quantity), categoryId: Number(category) };
    if (photo) data.photo = fs.readFileSync(photo.path);
    const products =     await prisma.product.delete({
      where: { id: Number(req.params.pid) }
    });
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const products = await productModel.filterProducts({
      categoryIds: checked?.map(Number) || [],
      priceRange: radio?.length ? { min: Number(radio[0]), max: Number(radio[1]) } : null
    });
    
    res.status(200).send({
      success: true,
      products: products.map(p => ({ ...p, photo: undefined })),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await prisma.product.count();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await prisma.product.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        category: true
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        quantity: true,
        shipping: true,
        categoryId: true,
        category: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.status(200).send({
      success: true,
      products: pageItems,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } }
        ]
      },
      include: {
        category: true
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        quantity: true,
        shipping: true,
        categoryId: true,
        category: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { categoryId: Number(cid) },
          { NOT: { id: Number(pid) } }
        ]
      },
      take: 3,
      include: {
        category: true
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        quantity: true,
        shipping: true,
        categoryId: true,
        category: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = (await categoryModel.listCategories()).find(c => c.slug === req.params.slug);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    const products = await productModel.productsByCategory(category.id);
    res.status(200).send({
      success: true,
      category,
      products: products.map(p => ({ ...p, photo: undefined })),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.forEach((i) => { total += i.price; });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // create order via prisma
          prisma.order.create({
            data: {
              buyerId: req.user.id,
              payment: result,
              products: {
                create: cart.map(c => ({
                  product: { connect: { id: c.id } },
                  quantity: c.quantity || 1
                }))
              }
            },
            include: {
              products: {
                include: {
                  product: true
                }
              },
              buyer: true
            }
          })
            .then(created => res.json({ ok: true, order: created }))
            .catch(err => { console.error(err); res.status(500).send(err); });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
