export default {
  type: "object",
  properties: {
    availibility: { type: "string" },
    price: { type: "number" },
  },
  required: ["availibility", "price"],
} as const;
