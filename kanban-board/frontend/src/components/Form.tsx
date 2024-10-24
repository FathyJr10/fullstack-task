import React from "react";

const Form: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 m-8 ">
      <b>Form</b>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          className="ml-2 p-1 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="ml-2 p-1 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          className="ml-2 p-1 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          className="ml-2 p-1 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="ml-2 p-1 border rounded-md"
        />
      </div>

      <button className="bg-blue-500 text-white p-2 rounded-md mt-4">
        Submit
      </button>
    </div>
  );
};

export default Form;
