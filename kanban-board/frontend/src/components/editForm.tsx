import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name?: string;
    age?: number;
    email?: string;
    mobileNumber?: string;
  }) => void;
  onDelete: () => Promise<void>;
  formData: { name: string; age: number; email: string; mobileNumber: string };
}

const Popup: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  formData,
}) => {
  const [localFormData, setLocalFormData] = useState(formData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!localFormData.name) {
      newErrors.name = "Name is required.";
    }

    // Age validation
    if (localFormData.age === undefined || localFormData.age <= 0) {
      newErrors.age = "Age must be a positive number.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!localFormData.email || !emailRegex.test(localFormData.email)) {
      newErrors.email = "Email must be valid.";
    }

    // Mobile Number validation
    const mobileRegex = /^[+]?[0-9]{10,15}$/;
    if (!mobileRegex.test(localFormData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be between 10 to 15 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedFields: Partial<typeof localFormData> = {};

    if (localFormData.name !== formData.name) {
      updatedFields.name = localFormData.name;
    }
    if (localFormData.age !== formData.age) {
      updatedFields.age = localFormData.age;
    }
    if (localFormData.mobileNumber !== formData.mobileNumber) {
      updatedFields.mobileNumber = localFormData.mobileNumber;
    }

    onSubmit(updatedFields);
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-black text-lg font-semibold">Edit Member</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={localFormData.name}
            onChange={handleChange}
            placeholder={formData.name}
            className={`text-black border p-2 rounded mb-2 w-full ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}

          <input
            type="number"
            name="age"
            value={localFormData.age}
            onChange={handleChange}
            placeholder={`${formData.age}`}
            className={`text-black border p-2 rounded mb-2 w-full ${
              errors.age ? "border-red-500" : ""
            }`}
          />
          {errors.age && (
            <span className="text-red-500 text-sm">{errors.age}</span>
          )}

          <input
            type="email"
            name="email"
            value={localFormData.email}
            onChange={handleChange}
            placeholder={formData.email}
            className={`text-black border p-2 rounded mb-2 w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            disabled
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          <input
            type="text"
            name="mobileNumber"
            value={localFormData.mobileNumber}
            onChange={handleChange}
            placeholder={formData.mobileNumber}
            className={`text-black border p-2 rounded mb-2 w-full ${
              errors.mobileNumber ? "border-red-500" : ""
            }`}
          />
          {errors.mobileNumber && (
            <span className="text-red-500 text-sm">{errors.mobileNumber}</span>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 p-2 rounded-md transition duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-500 text-white p-2 rounded-md transition duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
