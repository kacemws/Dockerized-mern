import instance from "./axios";

export const getSpaces = async () => {
  try {
    const answ = await instance.get("/v2/spaces");
    return answ?.data;
  } catch (err) {
    throw err;
  }
};

export const postSpace = async (data) => {
  try {
    const answ = await instance.post("/v2/spaces", data);
    return answ;
  } catch (err) {
    throw err;
  }
};
