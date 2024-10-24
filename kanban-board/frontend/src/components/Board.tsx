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
const Board: React.FC = () => {
  return (
    <div className="w-screen bg-blue-50 p-4 lg:p-8 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-auto">
      {/* Unclaimed Column */}
      <div className="p-4 bg-blue-50 border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-blue-50 mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">Unclaimed</h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            3
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[300px] sm:max-h-[400px] md:max-h-[350px] lg:max-h-[353px] overflow-y-auto relative">
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
        </div>
      </div>

      {/* First Contact Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">First Contact</h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            1
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[300px] sm:max-h-[400px] md:max-h-[350px] lg:max-h-[355px] overflow-y-auto relative">
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          {/* Add more cards here as needed */}
        </div>
      </div>

      {/* Preparing Work Offer Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">
            Preparing Work Offer
          </h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            1
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[300px] sm:max-h-[400px] md:max-h-[350px] lg:max-h-[355px] overflow-y-auto relative">
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
          {/* Add more cards here as needed */}
        </div>
      </div>

      {/* Sent to Therapists Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">
            Sent to Therapists
          </h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            1
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[300px] sm:max-h-[400px] md:max-h-[350px] lg:max-h-[355px] overflow-y-auto relative">
          <Card
            name="Ms. Cheryl A"
            age={25}
            email="cheryl@gmail.com"
            phone="+441234567890"
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
