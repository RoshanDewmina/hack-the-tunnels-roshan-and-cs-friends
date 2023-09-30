import { Response } from "express";
import { Err, Result } from "ts-results";
import { AuthorizationService } from "../../services";

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

export const verifyAuthorization = async (
  header: string | null,
): Promise<Result<boolean, Error>> => {
  if (!header) {
    return Err(new Error("Authorization header not set"));
  }

  if (!header.startsWith("Bearer ")) {
    return Err(new Error("Authorization header is not a bearer token"));
  }

  const token = header.split(" ")[1];

  return AuthorizationService.verify(token);
};
