import supertest from "supertest";
import { web } from "../src/application/web";
import { prismaClient } from "../src/application/database";
import { logger } from "../src/application/logging";

describe("POST /api/users", function () {
  //
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "jajaroyana",
      },
    });
  });
  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users/").send({
      username: "jajaroyana",
      password: "rahasia",
      name: "Jaja Royana",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("jajaroyana");
    expect(result.body.data.name).toBe("Jaja Royana");
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
      username: "jajaroyana",
      password: "rahasia",
      name: "Jaja Royana",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("jajaroyana");
    expect(result.body.data.name).toBe("Jaja Royana");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users/").send({
      username: "jajaroyana",
      password: "rahasia",
      name: "Jaja Royana",
    });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
