import { StatusCodes } from "http-status-codes";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    //creating a new user property in the request object that is also an object
    //holding the userId, role from the token
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
// 'admin' role will be passed as an argument, spread as an array
export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    // this checks if the role of the user in the req matches the admin role
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
