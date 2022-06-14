export const base_url = "http://localhost:8080";

export const columns = ["title", "count", "distance"];

export const options = {
  initial: [
    { title: "Равно", value: "=" },
    { title: "Содержит", value: "LIKE" },
    { title: "Больше", value: ">" },
    { title: "Меньше", value: "<" },
  ],
  title: [{ title: "Содержит", value: "LIKE" }],
  count: [
    { title: "Равно", value: "=" },
    { title: "Больше", value: ">" },
    { title: "Меньше", value: "<" },
  ],
  distance: [
    { title: "Равно", value: "=" },
    { title: "Больше", value: ">" },
    { title: "Меньше", value: "<" },
  ],
};
