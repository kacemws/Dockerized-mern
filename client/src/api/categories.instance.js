import instance from "./axios";

export const getCategories = async (space) => {
  try {
    const answ = await instance.get(`/v2/spaces/${space}/categories`);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};

export const postCategory = async (data) => {
  try {
    const answ = await instance.post("/v2/categories", data);
    return answ;
  } catch (err) {
    throw err;
  }
};
