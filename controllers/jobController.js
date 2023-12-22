//Job Data from Model from MongoDB
import Job from "../models/JobModel.js";

// Status Codes for CRUD & route responses
import { StatusCodes } from "http-status-codes";

// custom Error Class
import { NotFoundError } from "../errors/customErrors.js";

import { nanoid } from "nanoid";

// data
let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

//Get controller
export const getAllJobs = async (req, res) => {
  // add createdBy as a filter to the find method
  // to only find jobs for the userId
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

//POST Controller
export const createJob = async (req, res) => {
  // assign the userId from the JWT to the createdBy in 
  // the request as you're creating the job
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Get-- a Single Job Controller
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

// Patch -- Update Job controller
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

// DELETE JOB controller
export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ message: 'job deleted', job: removedJob });
};
