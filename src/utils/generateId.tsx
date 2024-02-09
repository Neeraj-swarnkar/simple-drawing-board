// Generates a random ID with length 6
const generateId = (length: any) =>
Array(length)
  .fill("")
  .map(() => Math.random().toString(36).charAt(2))
  .join("");

  export default generateId;