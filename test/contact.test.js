import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeTestAllContact,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contact", function () {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts/")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@example.com",
        phone: "08123456789",
      });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@example.com");
    expect(result.body.data.phone).toBe("08123456789");
  });
});

describe("GET /api/contact/:id", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can get user contact", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + contact.id)
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@example.com");
    expect(result.body.data.phone).toBe("08123456789");
  });

  it("should reject if contact ID don't exist", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + contact.id + 1)
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should reject if contact ID data type don't number ", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + "bukan nomor")
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
