import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name,main} = req.body;
    if (!name) {
      return res.status(404).send({
        message: "Name is required",
      });
    }
    if (!main) {
      return res.status(404).send({
        message: "main is required",
      });
    }
    // check existing categorys
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    const category = await new categoryModel({
      name,
      main,
      slug: slugify(name),
      slug1: slugify(main),
    }).save();
    
    res.status(200).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name,main } = req.body;
    const { id } = req.params;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        main,
        slug: slugify(name),
        slug1: slugify(main),
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      success :true ,
      message: "Category updated SuccessFully...",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while updating category....",
    });
  }
};

export const AllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      totalCategory: category.length,
      success: true,
      message: "getting All categories...",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting Categories",
      error,
    });
  }
};
export const singleCategoryController = async (req, res) => {
  try {
    const singleCategory = await categoryModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).send({
      success: true,
      message: "getting single category",
      singleCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};

export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        const deleteCategory = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category successfully deleted",
            deleteCategory,
          });
        } catch (error) {
          console.log(error);
          res.status(404).send({
            success: false,
            message: "Error while deleting category",
          });
        }
 }

 