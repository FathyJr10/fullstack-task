import React from "react";

interface CardProps {
  name: string;
  age: number;
  email: string;
  phone: string;
}
const Card: React.FC<CardProps> = ({ name, age, email, phone }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-black font-semibold">{name}</h2>
        <p className="text-gray-500">{age} yo</p>
      </div>
      <p className="text-black font-semibold">{email}</p>
      <p className="text-gray-500 font-semibold">{phone}</p>
    </div>
  );
};
export default Card;
