import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const Form: React.FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    age: "",
    email: "",
    phone: "",
  });
  const [phoneError, setPhoneError] = useState({
    phone: "",
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
    let phoneError = { phone: "" };
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
    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      phoneError.phone = "Please enter a valid phone number.";
      isValid = false;
    }
    setErrors(formErrors);
    setPhoneError(phoneError);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
    }
  };
  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value || "", // Update phone in formData
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
          type="text"
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
        <label htmlFor="phone" className="mb-1">
          Phone:
        </label>
        <PhoneInput
          id="phone"
          placeholder="Enter phone number"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          className="p-2 border rounded-md text-black"
          required
        />
        {phoneError.phone && (
          <p className="text-red-500 text-sm">{phoneError.phone}</p>
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
