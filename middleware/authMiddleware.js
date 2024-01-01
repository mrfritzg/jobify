import { StatusCodes } from "http-status-codes";
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    //setup a boolean variable to check for the demo test user
    const testUser = userId === "65911addcaef92cdf440128a";
    //creating a new user property in the request object that is also an object
    //holding the userId, role from the token
    req.user = { userId, role, testUser };

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
// MW to check fpr the demo test user
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
