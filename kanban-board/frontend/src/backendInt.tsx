//this file handle all the end points that comes from the backend side

import axios from "axios";
import Member from "./components/member";

//create new member
export const postMember = async (formData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/members",
      formData
    );
    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      alert("this email already exists.");

      throw new Error("Email already exists");
    }
    throw error;
  }
};

//fetch the members from the backend side
// Fetch members from API
export const fetchMembers = async (): Promise<Member[]> => {
  try {
    const response = await axios.get<Member[]>("http://localhost:3000/members");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    throw error;
  }
};
