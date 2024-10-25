import React from "react";

interface CardProps {
  name: string;
  age: number;
  email: string;
  mobileNumber: string;
  onEdit: () => void;
}
const Card: React.FC<CardProps> = ({
  name,
  age,
  email,
  mobileNumber,
  onEdit,
}) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 overflow-hidden cursor-pointer
    "
      onClick={onEdit} // Handle click event to open the pop menu
    >
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-black font-semibold text-sm sm:text-base md:text-lg lg:text-lg break-words">
          {name}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-base break-words">
          {age} yo
        </p>
      </div>
      <p className="text-black font-semibold text-xs sm:text-sm md:text-base lg:text-xs break-words">
        {email}
      </p>
      <p className="text-gray-500 font-semibold text-xs sm:text-sm md:text-base lg:text-sm break-words">
        {mobileNumber}
      </p>
    </div>
  );
};
export default Card;
