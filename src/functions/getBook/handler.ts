import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { deleteData } from "@libs/dynamoDb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const deleteBook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { authorName, bookName } = event.body;

  const param = {
    authorName,
    bookName,
  };
  const res = await deleteData(param);
  return formatJSONResponse({
    message: `Hello ${res}, welcome to the exciting Serverless world!`,
    res,
  });
};

export const main = middyfy(deleteBook);
