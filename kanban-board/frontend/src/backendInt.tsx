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
export const fetchMembers = async (): Promise<Member[]> => {
  try {
    const response = await axios.get<Member[]>("http://localhost:3000/members");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    throw error;
  }
};

//updating members data
export const updateMember = async (
  id: number,
  updatedData: Partial<Member>
) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/members/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      alert("this email already exists.");

      throw new Error("Email already exists");
    }
    throw error;
  }
};

export const deleteMember = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:3000/members/${id}`);

    if (response.status !== 200) {
      throw new Error("Failed to delete member");
    }
  } catch (error) {
    console.error("Error deleting member:", error);
    throw new Error("Failed to delete member");
  }
};
