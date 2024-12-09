import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createTestUser, getTestUser, removeTestUser } from "./test-util";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  //
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users/").send({
      username: "test",
      password: "rahasia",
      name: "Test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test");
    expect(result.body.data.password).toBeUndefined();
  });
  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users/").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username alredy registered", async () => {
    let result = await supertest(web).post("/api/users/").send({
      username: "test",
      password: "rahasia",
      name: "Test",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users/").send({
      username: "test",
      password: "rahasia",
      name: "Test",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });
  it("should reject login if username is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should reject login if password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });
  it("should get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Test");
  });
  it("should reject if token invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "salah");

    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update current user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "Jaja123",
        name: "Jaja",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("Jaja");
    expect(result.body.data.username).toBe("test");

    const user = await getTestUser();
    expect(await bcrypt.compare("Jaja123", user.password)).toBe(true);
  });
  it("should can update user name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Jaja",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("Jaja");
    expect(result.body.data.username).toBe("test");
  });
  it("should can update user password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "Jaja123",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    const user = await getTestUser();
    expect(await bcrypt.compare("Jaja123", user.password)).toBe(true);
  });
  it("should reject if token invalid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({
        password: "Jaja123",
        name: "Jaja",
      });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined;
  });
});
describe("DELETE /api/users/logout", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });
  it("should can user logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("ok");
    const user = await getTestUser();
    expect(user.token).toBeNull();
  });
});
