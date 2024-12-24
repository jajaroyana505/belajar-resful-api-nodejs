import supertest from "supertest";
import {
  createTestContact,
  createTestUser,
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
  });
});