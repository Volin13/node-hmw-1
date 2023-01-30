const contacts = require('./contacts.js');
const argv = require('yargs').argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      try {
        const сontactsList = await contacts.listContacts();
        console.log(сontactsList);
      } catch (error) {
        console.log('\x1B[31mError!');
      }
      break;

    case 'get':
      try {
        const contact = await contacts.getContactById(String(id));
        if (contact === null) {
          console.log(`\x1B[31mError! Can't find contact with ID ${id}!`);
          break;
        }
        console.log(contact);
      } catch (error) {
        console.log('\x1B[31mError!');
      }
      break;

    case 'add':
      try {
        const addNewContact = await contacts.addContact(name, email, phone);
        console.log('\x1B[32m Contact created \n\x1b[0m', addNewContact);
      } catch (error) {
        console.log('\x1B[31mError!');
      }
      break;

    case 'remove':
      try {
        const newContactsList = await contacts.removeContact(String(id));
        if (newContactsList === null) {
          console.log(`\x1B[31mError! Can't find contact with ID ${id}!`);
          break;
        }
        console.log(
          '\x1B[32m Contact Removed. New contacts list:\n',
          newContactsList
        );
      } catch (error) {
        console.log('\x1B[31mError!');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
