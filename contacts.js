const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const сontactsList = await listContacts();
  const contact = сontactsList.find(item => item.id === contactId);
  return contact ? contact : null;
};

const updateContacts = async contacts =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const addContact = async (name, email, phone) => {
  const сontactsList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  сontactsList.push(newContact);
  updateContacts(сontactsList);
  return newContact;
};

const removeContact = async contactId => {
  const сontactsList = await listContacts();
  const removeIndex = сontactsList.findIndex(item => item.id === contactId);
  if (removeIndex === -1) {
    return null;
  }
  сontactsList.splice(removeIndex, 1);
  updateContacts(сontactsList);
  return сontactsList;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
