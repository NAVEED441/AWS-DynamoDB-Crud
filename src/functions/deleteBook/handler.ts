import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getData } from "@libs/dynamoDb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getBook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { availibility, price } = event.body;

  const param = {
    availibility,
    price,
  };
  const res = await getData(param);
  return formatJSONResponse({
    message: `Hello ${res.statusCode}, welcome to the exciting Serverless world!`,
    res,
  });
};

export const main = middyfy(getBook);
