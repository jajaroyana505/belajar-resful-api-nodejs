import supertest from "supertest";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeTestAllContact,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contact/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can create new address", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "province test",
        country: "indonesia",
        postal_code: "41262",
      });

    logger.info(testContact);
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("province test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("41262");
  });
  it("should reject if address request is invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "province test",
        country: "",
        postal_code: "",
      });

    expect(result.status).toBe(400);
  });
  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "province test",
        country: "",
        postal_code: "",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });
  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("province test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("41262");
  });
  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
describe("PUT /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });
  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can update contact", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "jalan test baru",
        city: "kota test baru",
        province: "province test baru",
        country: "IDN",
        postal_code: "41263",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test baru");
    expect(result.body.data.city).toBe("kota test baru");
    expect(result.body.data.province).toBe("province test baru");
    expect(result.body.data.country).toBe("IDN");
    expect(result.body.data.postal_code).toBe("41263");
  });
  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test")
      .send({
        street: "jalan test baru",
        city: "kota test baru",
        province: "province test baru",
        country: "IDN",
        postal_code: "41263",
      });
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test")
      .send({
        street: "jalan test baru",
        city: "kota test baru",
        province: "province test baru",
        country: "IDN",
        postal_code: "41263",
      });
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
describe("DELETE /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });
  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("ok");

    const newTestAddress = await getTestAddress();
    expect(newTestAddress).toBeNull();
  });

  it("should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });
  afterEach(async () => {
    await removeAllTestAddresses();
    await removeTestAllContact();
    await removeTestUser();
  });

  it("should can list address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });
});
