const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

export const addBook = async (param) => {
  try {
    const data = {
      TableName: "Library-Table",
      Item: param,
    };
    console.log("something went wrong");
    const res = await dynamoDb.put(data).promise();
    return res;
  } catch (err) {
    return err;
  }
};

export const getData = async (param) => {
  try {
    console.log(
      "sddddddddddddddddddddddddddddddd==========>>>>>>>>>>>>>>>> ",
      param.authorName
    );
    //     const data = {
    //       TableName: "Library-Table",

    //       // KeyConditionExpression: `authorName = :yyyy `,
    //       FilterExpression: "begins_with(authorName, :t)",
    //       ExpressionAttributeValues: {
    //         // ":yyyy": param.authorName,
    //         ":t": param.search,
    //       },
    //     };
    //     const sdfa = await dynamoDb.scan(data).promise();
    //     return sdfa;
    //   } catch (err) {
    //     return err;
    //   }
    // };
    const data = {
      TableName: "Library-Table",
      IndexName: "AvailibilityPriceIndex",
      KeyConditionExpression: `availibilty = :av And price>=:t `,

      ExpressionAttributeValues: {
        ":av": param.availibility,
        ":t": param.price,
      },
    };
    const sdfa = await dynamoDb.query(data).promise();
    return sdfa;
  } catch (err) {
    return err;
  }
};
// Get data partitioned by single partition key

// const query = {

//   TableName: "Library-Table",

//   KeyConditionExpression: "authorName = :ac",

//   ExpressionAttributeValues: {

//     ":ac" : param.authorName

//   }

// }

// const query = {

//   TableName: "Library-Table",

//   KeyConditionExpression: "authorName = :ac and begins_with(bookName, :mv)",

//   ExpressionAttributeValues: {

//     ":ac" : param.authorName,

//     ":mv":  param.bookName
//   }

// }

// const query = {

//   TableName: "Media-Table",

//   KeyConditionExpression: "actor = :ac and movie = :mv",

//   FilterExpression: "",

//   ExpressionAttributeValues: {

//     ":ac" : p_data.actor,

//     ":mv": p_data.movie

//   }

// }

// const query = {
//   TableName: "Media-Table",

//   KeyConditionExpression: "actor = :ac",

//   ProjectionExpression: "#rl, #yr, #mov",

//   ExpressionAttributeNames: {
//     "#rl": "role",

//     "#yr": "year",

//     "#mov": "movie",
//   },

//   ExpressionAttributeValues: {
//     ":ac": p_data.actor,
//   },
// };

export const deleteData = async (param) => {
  try {
    const delet = {
      TableName: "Library-Table",
      Key: param,
    };
    const result = await dynamoDb.delete(delet).promise();
    return result + "Data is deleted";
  } catch (err) {
    console.log(err);
  }
};
export const updateData = async (param) => {
  try {
    const data = {
      TableName: "Library-Table",
      Key: {
        authorName: param.authorName,
        bookName: param.bookName,
      },
      UpdateExpression: "set price=:P, availibilty=:A , quantity=:Q",
      ExpressionAttributeValues: {
        ":P": param.price,
        ":A": param.availibilty,
        ":Q": param.quantity,
      },
    };
    const result = await dynamoDb.update(data).promise();
    return result + "update successfully";
  } catch (err) {
    return err;
  }
};
