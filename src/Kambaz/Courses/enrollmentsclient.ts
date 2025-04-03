import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/users/current/courses`;

export const deleteEnrollment = async (courseId: string) => {
  const url = `${ENROLLMENTS_API}/${courseId}/enrollments`;
  const { data } = await axiosWithCredentials.delete(url);
  return data;
};

export const createEnrollment = async (courseId: string) => {
  const url = `${ENROLLMENTS_API}/${courseId}/enrollments`;
  const { data } = await axiosWithCredentials.post(url);
  return data;
};
