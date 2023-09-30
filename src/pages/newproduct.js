import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors,createColor  } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { clearImages, delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { SketchPicker } from 'react-color';
import { ColorBadge } from "../Datasource";



let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color ")
    .default([]),
  quantity: yup.number().required("Quantity is Required"),
});

const Newproduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentColor, setCurrentColor] = useState([]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  const catState = useSelector((state) => state.pCategory.pCategories);
 
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  const [sizeInput, setSizeInput] = useState({ size: '', quantity: '' });

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const createProductHandler = async (values) => {
    if ( values.color.length === 0) {
      toast.error('select a color please')
    } else {
      try {
        const createdProduct = await dispatch(createProducts(values));
        if (createdProduct) {
          formik.resetForm();
          dispatch(clearImages());
          setTimeout(() => {
            dispatch(resetState());
          }, 3000);
        } else {
          toast.error("Something Went Wrong!");
        }
      } catch (error) {
        console.error("Error creating product:", error);
        toast.error("Error in uploading image!");
      }
    }
  };
  
  const handleAddSize = () => {
    if (sizeInput.size && sizeInput.quantity) {
      // Check if the size is already added in sizeInput
      const isSizeAdded = formik.values.size.some(
        (size) => size.size === sizeInput.size
      );

      if (isSizeAdded) {
        toast.error('Size is already added.');
      } else {
        const newSize = { size: sizeInput.size, quantity: parseInt(sizeInput.quantity) };
        formik.setFieldValue('size', [...formik.values.size, newSize]);
        setSizeInput({ size: '', quantity: '' });
      }
    } else {
      toast.error('Please enter both size and quantity.');
    }
  };

  
  

  useEffect(() => {
    
    formik.values.images = img;
  }, [img]);

  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      profit: "",
      brand: "",
      category: "",
      tags: "",
      color: [],
      size: [],
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        createProductHandler(values);
    },
  });
  // const handleColors = (selectedOptions) => {
  //   const setlectedColorIds = selectedOptions.map((option) => option.value)
  //   setSelectedColors(setlectedColorIds);
  // };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
      <form
          onSubmit={(e) => {e.preventDefault()}}
          encType="multipart/form-data"
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Profit"
            name="profit"
            onChng={formik.handleChange("profit")}
            onBlr={formik.handleBlur("profit")}
            val={formik.values.profit}
          />
          <div className="error">
            {formik.touched.profit && formik.errors.profit}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <div>
            <label htmlFor="color">Select Colors:</label>
            <div className="color-picker-container">
              <SketchPicker
                color={currentColor}
                onChange={(color) => {
                  setCurrentColor(color.hex);
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  formik.setFieldValue("color", [
                    ...formik.values.color,
                    currentColor
                  ]);
                }}
              >
                Add Color
              </button>
          </div>
          <div className="selected-colors">
                    {formik.values.color.map((color, index) => (
                      <div key={index} className="selected-color">
                        <ColorBadge color={color} />
                        <button
                          className="btn btn-danger btn-sm"
                            onClick={() => {
                            const updatedColors = formik.values.color.filter(
                              (c, i) => i !== index
                            );
                            formik.setFieldValue("color", updatedColors);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
            </div>
            <input
        type="text"
        placeholder="Size"
        value={sizeInput.size}
        onChange={(e) =>
          setSizeInput({ ...sizeInput, size: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Quantity"
        value={sizeInput.quantity}
        onChange={(e) =>
          setSizeInput({ ...sizeInput, quantity: e.target.value })
        }
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddSize}
      >
        Add Size
      </button>
          
      <div className="selected-sizes">
      <h6>Added Sizes</h6>

  {formik.values.size.map((size, index) => (
    <div key={index} className="selected-size" style={{marginBottom: '0.6rem'}}>
      Size: {size.size}, Quantity: {size.quantity}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          const updatedSizes = formik.values.size.filter(
            (s, i) => i !== index
          );
          formik.setFieldValue('size', updatedSizes);
        }}
        style={{marginLeft: '0.4rem'}}
      >
        Remove
      </button>
    </div>
  ))}
</div>


          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
          <Dropzone
            onDrop={(acceptedFiles) => {
              setIsUploadingImage(true); 
              dispatch(uploadImg(acceptedFiles))
                .then(() => {
                  setIsUploadingImage(false);
                })
                .catch(() => {
                  setIsUploadingImage(false); 
                });
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!isUploadingImage && (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          {isUploadingImage && <p>Uploading...</p>} {/* Show loading indicator */}
        </div>
      </section>
            )}
          </Dropzone>
        </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
        className="btn btn-success border-0 rounded-3 my-5"
        onClick={() => {
          if (currentColor !== "") {
            createProductHandler(formik.values);
          } else {
            toast.error("Please Select color to add product")
          }
        }}
      >
        Add Product
      </button>
        </form>
      </div>
    </div>
  );
};

export default Newproduct;




