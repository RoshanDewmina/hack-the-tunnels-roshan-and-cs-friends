import { Response } from "express";

export const error = async (
  response: Response,
  {
    error,
    statusCode,
  }: {
    error: string;
    statusCode: number;
  },
) => {
  response.status(statusCode);
  response.send({
    data: null,
    error: error,
  });
};

export const success = async (
  response: Response,
  {
    data,
    statusCode,
  }: {
    data: any;
    statusCode: number;
  },
) => {
  response.status(statusCode);
  response.send({
    data: data,
    error: null,
  });
};
