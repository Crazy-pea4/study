import Mock from "mockjs";

Mock.mock("http://localhost:8080/test", {
  test: 111,
});
