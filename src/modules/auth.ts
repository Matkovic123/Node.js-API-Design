import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

// for signing in
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  const salt = 5;
  return bcrypt.hash(password, salt);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  ); // JWT_SECRET is basically salt in hashing, but this is not 100% equal to hashing
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }
  const [_, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Invalid bearer token" });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }
};
