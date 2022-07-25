export const bodySchema = {
  type: "object",
  properties: {
    count: { type: "number" },
    description: { type: "string" },
    title: { type: "string" },
    price: { type: "number" },
  },
  required: ["count", "title", "price"],
};

export const schema = {
  type: "object",
  properties: {
    body: bodySchema,
  },
} as const;
