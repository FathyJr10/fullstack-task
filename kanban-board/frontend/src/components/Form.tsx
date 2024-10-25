import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { postMember } from "../backendInt";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const Form: React.FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    age: "",
    email: "",
    mobileNumber: "",
  });
  const [mobileNumberError, setMobileNumberError] = useState({
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    name: "",
    age: "",
    email: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Validation function
  const validateForm = () => {
    let formErrors = { title: "", name: "", age: "", email: "" };
    let mobileNumberError = { mobileNumber: "" };
    let isValid = true;

    // Title validation
    if (!formData.title) {
      formErrors.title = "Please select a title.";
      isValid = false;
    }

    // Name validation
    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    // Age validation
    if (
      !formData.age ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) < 0
    ) {
      formErrors.age = "Please enter a valid age.";
      isValid = false;
    }

    // Email validation
    if (!formData.email || !emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    }
    if (!formData.mobileNumber || !isValidPhoneNumber(formData.mobileNumber)) {
      mobileNumberError.mobileNumber = "Please enter a valid number.";
      isValid = false;
    }
    setErrors(formErrors);
    setMobileNumberError(mobileNumberError);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Attempt to submit the form data to the API
        const result = await postMember(formData);
        console.log("Form submitted successfully:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleMobileNumberChange = (value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      mobileNumber: value || "", // Update mobileNumber in formData
    }));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-4 ">
      <b className="text-lg mb-4">Form</b>

      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1">
          Title:
        </label>
        <select
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border rounded-md text-black placeholder-blue-900"
        >
          <option value="">Select Title</option>
          <option value="mr">Mr.</option>
          <option value="mrs">Mrs.</option>
          <option value="ms">Ms.</option>
        </select>
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded-md text-black"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="age" className="mb-1">
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="p-2 border rounded-md text-black"
          required
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1">
          Email:
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded-md text-black"
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="mobileNumber" className="mb-1">
          mobileNumber:
        </label>
        <PhoneInput
          type="text"
          id="mobileNumber"
          placeholder="Enter mobileNumber number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleMobileNumberChange}
          className="p-2 border rounded-md text-black"
          required
        />
        {mobileNumberError.mobileNumber && (
          <p className="text-red-500 text-sm">
            {mobileNumberError.mobileNumber}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
