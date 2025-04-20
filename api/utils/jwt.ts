import jwt from "jsonwebtoken";

export const createToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

export const decodeToken = (token: string) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};
