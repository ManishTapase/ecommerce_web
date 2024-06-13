import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
dotenv.config();
// payment getway
// var gateway = new braintree.BraintreeGateway({
//   environment:braintree.Environment.Sandbox,
//   merchantId:process.env.BRAINTREE_MERCHANTID,
//   publicKey:process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey:process.env.BRAINTREE_PRIVATE_KEY

// })

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "kmrtqwk7dj2n8wf4",
  publicKey: "hgkhjhdxvssksbhw",
  privateKey: "806253cbcbf75b6fd59c4900806b7a4e",
});

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      mainCategory,
      discription,
      price,
      category,
      quantity,
      shipping,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res
          .status(401)
          .send({ success: false, message: "name is required.." });
      case !category:
        return res
          .status(402)
          .send({ success: false, message: "category is required.." });
      case !mainCategory:
        return res
          .status(403)
          .send({ success: false, message: "main category is required.." });
      case !price:
        return res
          .status(404)
          .send({ success: false, message: "price is required.." });
      case !quantity:
        return res
          .status(405)
          .send({ success: false, message: "quantity is required.." });
      case !discription:
        return res
          .status(406)
          .send({ success: false, message: "description is required.." });
      case !photo && photo.size > 1000000:
        return res
          .status(506)
          .send({
            success: false,
            message: "photo is required and should be less than 1mb",
          });
    }
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong while creating product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, category, price, quantity, discription, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(401).send({ error: "name is required.." });
      case !category:
        return res.status(402).send({ error: "category is required.." });
      case !price:
        return res.status(403).send({ error: "price is required.." });
      case !quantity:
        return res.status(404).send({ error: "quantity is required.." });
      case !discription:
        return res.status(405).send({ error: "description is required.." });
      case photo && photo.size > 1000000:
        return res
          .status(506)
          .send({ error: "photo is required and should be less than 1mb" });
    }
    const newproduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      newproduct.photo.data = fs.readFileSync(photo.path);
      newproduct.photo.contentType = photo.type;
    }
    await newproduct.save();
    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      newproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong while creating product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const singleproduct = await productModel.findOne({
      slug: req.params.slug,
    });
    if (!singleproduct) {
      return res.status(404).send({ message: "product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product is found...",
      singleproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong while getting product",
      error,
    });
  }
};

export const getAllProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      totalproducts: product.length,
      success: true,
      message: "All products...",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Something Went Wrong While Getting All Products",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    // console.log(error);
    res.status(404).send({
      success: false,
      message: "something went wrong while getting photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "product deleted successfully....",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "server Error" });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let arg = {};
    if (checked.length > 0) arg.Cat = checked;
    if (radio.length) arg.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find({
      category: arg.Cat,
      price: arg.price,
    });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const product = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      message: "products",
      category,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

export const ProductByMainCategory = async (req, res) => {
  try {
    const { mainCat } = req.body;
    const products = await productModel
      .find({ mainCategory: mainCat })
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });

    console.log(products.length);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
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

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { mainCategory: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(5)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "error while getting related product",
      error,
    });
  }
};

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

export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    var item = [];
    let total = 0;
    let count = [];
    cart.map((i) => {
      // total += i.p.price;
      total = total + i.cnt * i.p.price;
      count.push(i.cnt);
      item.push(i.p);
    });
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
          const order = new orderModel({
            products: item,
            cnt: count,
            payment: result,
            buyer: req.user._id,
          })
            .save()
            .then(() => {
              res.json({ ok: true });
            });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const orderController = async (req,res) => {
  try {
    const orders = await orderModel
      .find({})
      res.status(200).send({
        success: true,
        orders,
      });
  } catch (error) {
     console.log(error);
     res.status(400).send({
      success: false,
      error
    });
  }
};

export const deleteOrderController =async(req,res)=>{
  try {
    await orderModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Order Cancel successfully....",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "server Error" });
  }
}
export const updateStatusController =async(req,res)=>{
  try {
     const update = await orderModel.findByIdAndUpdate(req.params.oid,{$set:{status:req.body.status}},{ new: true });
     if(!update){
      res.status(400).send({
        success: false,
        message: "order not found...",
      });
     }
     res.status(200).send({
      success: true,
      message: "Status updated successfully....",
      update
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "server Error" });
  }
}
