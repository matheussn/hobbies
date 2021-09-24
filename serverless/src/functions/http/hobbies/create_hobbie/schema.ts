export default {
  "$schema": "http://json-schema.org/draft-04/schema#",
  type: "object",
  required: ["name", "year", "experienceLevel"],
  properties: {
    name: { type: 'string', required: true},
    year: { type: 'number' },
    experienceLevel: { type: 'string' }
  }
} as const;
