export default {
  type: "object",
  properties: {
    authorName: { type: "string" },
    bookName: { type: "string" },
  },
  required: ["authorName", "bookName"],
} as const;
