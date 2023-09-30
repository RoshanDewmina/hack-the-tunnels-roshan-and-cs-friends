import express, { Request, Response } from "express";
import {
  AccountService,
  AuthenticationService,
  AuthorizationService,
} from "../../../services";
import { success, error } from "../utils";

const router = express.Router();

const signUp = async (request: Request, response: Response) => {
  const result = await AccountService.create(
    request.body.email,
    request.body.password,
    request.body.role,
  );

  if (result.err) {
    return error(response, {
      error: result.val.message,
      statusCode: 400,
    });
  }

  return success(response, {
    data: {
      account: result.val,
    },
    statusCode: 201,
  });
};

const login = async (request: Request, response: Response) => {
  const result = await AuthenticationService.login(
    request.body.email,
    request.body.password,
  );

  if (result.err) {
    return error(response, {
      error: result.val.message,
      statusCode: 400,
    });
  }

  return success(response, {
    data: {
      token: result.val,
    },
    statusCode: 200,
  });
};

const profile = async (request: Request, response: Response) => {
  const authenticationResult = await AuthorizationService.emailFromToken(
    request.headers.authorization,
  );

  if (authenticationResult.err) {
    return error(response, {
      error: authenticationResult.val.message,
      statusCode: 401,
    });
  }

  const accountEmail = authenticationResult.val as string;
  const account = await AccountService.findByEmail(accountEmail);

  if (account === null) {
    return error(response, {
      error: "Account not found",
      statusCode: 404,
    });
  }

  return success(response, {
    data: {
      account: account,
    },
    statusCode: 200,
  });
};

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", profile);

export default router;
