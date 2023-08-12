import React from "react";
import * as yup from "yup";

// const colorSchema = yup.string().matches(/^#[0-9a-fA-F]{6}$/, "Invalid color format");
const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onChng, onBlr} = props;
  
  // const handleChange =(e) =>{
  //   const inputValue = e.target.value;
  //   if(colorSchema.isValidSync(inputValue)){
  //     onChng(e);
  //   }
  // }
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onChng}
        onBlur={onBlr}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
