import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { updateData } from "@libs/dynamoDb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const updateBook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { authorName, bookName, availibilty, price, quantity } = event.body;

  const param = {
    authorName,
    bookName,
    availibilty,
    price,
    quantity,
  };
  const res = await updateData(param);
  return formatJSONResponse({
    message: `Hello ${res}, welcome to the exciting Serverless world!`,
    res,
  });
};

export const main = middyfy(updateBook);
