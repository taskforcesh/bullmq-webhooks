const usersTable: { [index: string]: { webhook: string; email: string } } = {
  "1": { webhook: "http://localhost:8080/1", email: "karen@example.com" },
  "2": {
    webhook: "http://localhost:8080/2",
    email: "thomas@example.com",
  },
  "3": { webhook: "http://localhost:8080/3", email: "sofia@example.com" },
  "4": { webhook: "http://localhost:8080/4", email: "peter@example.com" },
  "5": { webhook: "http://localhost:8080/5", email: "clara@example.com" },
  "6": { webhook: "http://localhost:8080/6", email: "john@example.com" },
};

export const getUserById = async (userId: string) => usersTable[userId];
