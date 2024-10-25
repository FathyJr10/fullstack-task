import React, { useEffect, useState } from "react";
import { fetchMembers } from "../backendInt";
import Member from "./member";
import Card from "./Card";

const Board: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const loadMembers = async () => {
    try {
      const membersData = await fetchMembers();
      setMembers(membersData);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  useEffect(() => {
    loadMembers();
    // Set up polling every 10 seconds
    const pollingInterval = setInterval(() => {
      loadMembers();
    }, 5000);
    return () => clearInterval(pollingInterval);
  }, []);
  const unclaimedMembers = members.filter(
    (member: { status: string }) => member.status === "Unclaimed"
  );
  const firstContactMembers = members.filter(
    (member) => member.status === "First Contact"
  );
  const preparingWorkOfferMembers = members.filter(
    (member) => member.status === "Preparing Work Offer"
  );
  const sentToTherapistsMembers = members.filter(
    (member) => member.status === "Sent to Therapists"
  );

  return (
    <div className="w-screen bg-blue-50 p-4 lg:p-8 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-auto">
      {/* Unclaimed Column */}
      <div className="p-4 bg-blue-50 border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-blue-50 mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">Unclaimed</h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {unclaimedMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative">
          {unclaimedMembers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              age={member.age}
              email={member.email}
              mobileNumber={member.mobileNumber}
            />
          ))}
        </div>
      </div>

      {/* First Contact Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">First Contact</h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {firstContactMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative"></div>
      </div>

      {/* Preparing Work Offer Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">
            Preparing Work Offer
          </h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {preparingWorkOfferMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative"></div>
      </div>

      {/* Sent to Therapists Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">
            Sent to Therapists
          </h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {sentToTherapistsMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative"></div>
      </div>
    </div>
  );
};

export default Board;
