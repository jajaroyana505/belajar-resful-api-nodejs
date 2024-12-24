import supertest from "supertest";
import {
  createManyTestContact,
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
      .get("/api/contacts/" + 1)
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(404);
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

describe("PUT /api/contact/:id", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can edit user contact", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + contact.id)
      .set("Authorization", "test")
      .send({
        first_name: "test-edit",
        last_name: "test-edit",
        email: "test@example.com",
        phone: "000000000",
      });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test-edit");
    expect(result.body.data.last_name).toBe("test-edit");
    expect(result.body.data.email).toBe("test@example.com");
    expect(result.body.data.phone).toBe("000000000");
  });

  it("should reject if contact is not found", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + 1)
      .set("Authorization", "test")
      .send({
        first_name: "test-edit",
        last_name: "test-edit",
        email: "test@example.com",
        phone: "000000000",
      });
    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
describe("DELETE /api/contact/:id", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can delete user contact", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + contact.id)
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("ok");
  });

  it("should reject if contact is not found", async () => {
    const result = await supertest(web)
      .delete("/api/contacts/" + 1)
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("should reject if token is not valid", async () => {
    const contact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + contact.id)
      .set("Authorization", "salah");
    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });
  afterEach(async () => {
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });
  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ page: 2 })
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });
});
