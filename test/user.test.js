const { User } = require("../models");

const request = require("supertest");

const app = require("../app");


describe('/api/register', () => {
  test("should return user when the all request body is valid", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        name: "test",
        email: "test@gmail.com",
        password: "12345678"
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("data.name", "test");
    expect(res.body).toHaveProperty("data.email", "test@gmail.com");
  });
});

describe('/api/login', () => {
  test("should return an api token when the user account exists", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        email: "test@gmail.com",
        password: "12345678"
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("api_token");
    expect(res.body).toHaveProperty("message", "Auth succeeded");
  });
});

describe('/api/users', () => {
  test("should return all the users when the user has admin permission", async () => {
    const adminUser = await User.findAll({
      where: { "email": "admin@gmail.com" }
    });
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", adminUser[0].api_token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBeTruthy();;
  });
});

describe('/api/logout', () => {
  test('should logout the user', async () => {
    const userOne = await User.findAll({
      where: { "email": "test@gmail.com" }
    });
    const res = await request(app)
      .post("/api/logout")
      .set("Authorization", userOne[0].api_token);
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Logout successfully");
  });

});

afterAll(async () => {
  await User.destroy({
    truncate: true
  });
});

