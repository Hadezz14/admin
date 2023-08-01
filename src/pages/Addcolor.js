import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../features/color/colorSlice";
let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});
const Addcolor = ({isSuccess,isError}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;
  useEffect(() => {
    console.log("Fetching color data")
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } 
    else {
      // dispatch(resetState());
    }
    if(!location.pathname.includes("/add-color")){
      dispatch(resetState());
    }
  }, [getColorId, dispatch,location]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfullly!");
      // navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     title: colorName || "",
  //   },
  //   validationSchema: schema,
  //   onSubmit: async (values) => {
  //     if (getColorId !== undefined) {
  //       const data = { id: getColorId, colorData: values };
  //       dispatch(updateAColor(data));
        
  //     } else {
  //       dispatch(createColor(values));
  //       formik.resetForm();
  //       setTimeout(() => {
  //         console.log("error")
  //       }, 300);
  //     }
  //   },
  // });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit:  (values) => {
      console.log("Form summitted with values: ", values)
      try {
        if (getColorId !== undefined) {
          const data = { id: getColorId, colorData: values };
          dispatch(updateAColor(data));
        } else {
          dispatch(createColor(values));
          formik.resetForm();
        }
        // Display success toast message for adding/editing color
        toast.success(
          getColorId !== undefined
            ? "Color Updated Successfully!"
            : "Color Added Successfully!"
        );
      } catch (error) {
        // Handle API call errors
        toast.error("Something Went Wrong!");
      }
    },
  });

  return (
    <div>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
            
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-1"
            type="submit"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
