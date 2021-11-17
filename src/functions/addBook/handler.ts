import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { addBook } from "@libs/dynamoDb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const postBook: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
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
  const res = await addBook(param);
  return formatJSONResponse({
    messa: res.statusCode,
  });
};

export const main = middyfy(postBook);
