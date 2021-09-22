export default {
  type: "object",
  properties: {
    name: { type: 'string', require: false },
    year: { type: 'number', require: false },
    experienceLevel: { type: 'string', require: false }
  },
} as const;
