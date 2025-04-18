import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

export const updateAnswer = async (answer: any) => {
  console.log("updateanswer: ", answer)
  const { data } = await axios.put(`${ANSWERS_API}/${answer._id}`, answer);
  return data;
};