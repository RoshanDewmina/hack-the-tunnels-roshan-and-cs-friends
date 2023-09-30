import express, { Request, Response } from "express";
import { OrderService } from "../../../services";
import { success, error } from "../utils";

const router = express.Router();

const getOrder = async (request: Request, response: Response) => {
  const id = request.params.id;
  const result = await OrderService.find(id);

  if (result.err) {
    return error(response, {
      error: result.val.message,
      statusCode: 404,
    });
  }

  return success(response, {
    data: {
      order: result.val,
    },
    statusCode: 200,
  });
};

const createOrder = async (request: Request, response: Response) => {
  const result = await OrderService.create(
    request.body.customer,
    request.body.lineItems,
  );

  if (result.err) {
    return error(response, {
      error: result.val.message,
      statusCode: 400,
    });
  }

  return success(response, {
    data: {
      order: result.val,
    },
    statusCode: 201,
  });
};

router.get("/:id", getOrder);
router.post("/", createOrder);

export default router;
