import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
  if (!contact) {
    throw new ResponseError(404, "Conatct is not found");
  }
  return contact;
};

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);
  await get(user, contact.id);

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  await get(user, contactId);
  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchContactValidation, request);
  const username = user.username;

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;
  const fillters = [];
  fillters.push({
    username: username,
  });
  if (request.name) {
    fillters.push({
      OR: [
        {
          first_name: {
            contains: request.name,
          },
        },
        {
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.email) {
    fillters.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    fillters.push({
      phone: {
        contains: request.phone,
      },
    });
  }
  const contact = await prismaClient.contact.findMany({
    where: {
      AND: fillters,
    },
    take: request.size,
    skip: skip,
  });
  const totalItem = await prismaClient.contact.count({
    where: {
      AND: fillters,
    },
  });

  return {
    data: contact,
    pagging: {
      page: request.page,
      total_item: totalItem,
      total_page: Math.ceil(totalItem / request.size),
    },
  };
};
export default { create, get, update, remove, search };
