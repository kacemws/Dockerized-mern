import instance from "./axios";

export const login = async (data) => {
  try {
    const answ = await instance.post("/v1/user/login", data);
    return answ;
  } catch (err) {
    throw err;
  }
};

export const signup = async (data) => {
  try {
    const answ = await instance.post("/v1/user/signup", data);
    return answ;
  } catch (err) {
    throw err;
  }
};
