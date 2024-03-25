import { Error } from "mongoose";
import AppError from "./app-error";
import { NextResponse } from "next/server";

/**
 * Hanlde when Cast Error is happened
 * @param {Error} err - Mongoose error object
 * @returns - AppError
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

/**
 * Hanlde when Duplicate Fields is happened
 * @param {Error} err - Mongoose error object
 * @returns - AppError
 */
const handleDuplicateFieldsBD = (err) => {
  const message = `Duplicate field value: ${JSON.stringify(
    err.keyValue
  ).replaceAll('"', "")}. Please use another value!`;
  return new AppError(message, 400);
};

/**
 * Hanlde when Validation Errors is happened
 * @param {Error} err - Mongoose error object
 * @returns - AppError
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

/**
 * Send errors in dev environment
 * @param {AppError} err - AppError object
 */
const sendErrorDev = (err) => {
  return {
    json: {
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    },
    status: { status: err.statusCode },
  };
};

/**
 * Send errors in dev environment
 * @param {AppError} err - AppError object
 */
const sendErrorProd = (err) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return NextResponse.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programing or the unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR", err);

    // 2) Send generic message
    return NextResponse.json(
      {
        status: "error",
        message: "Something went very wrong!",
      },
      { status: 500 }
    );
  }
};

/**
 * Error controller
 * @param {AppError} err - AppError object
 */
const handleErrors = (err) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let res = {
    json: {},
    status: {},
  };

  if (process.env.NODE_ENV === "development") {
    res = sendErrorDev(err);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);

    // Mongoose bad ObjectId
    if (error.name === "CastError") error = handleCastErrorDB(error);
    // Mongoose duplicate DB field
    if (error.code === 11000) error = handleDuplicateFieldsBD(error);
    // Mongoose validate
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorProd(error);
  }

  return Response.json(res.json, res.status);
};

export default handleErrors;
