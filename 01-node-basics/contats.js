const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.normalize('./db/contacts.json');

const listContacts = () => {
  fs.readFile(contactsPath, (err, data) => {
    try {
      const result = JSON.parse(data);
      console.table(result);
    } catch (err) {
      console.log(err);
    }
  });
};

const getContactById = contactId => {
  fs.readFile(contactsPath, (err, data) => {
    try {
      const result = JSON.parse(data);
      const searchingContact = result.find(contact => contact.id === contactId);
      console.log(searchingContact);
    } catch (err) {
      console.log(err);
    }
  });
};

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    try {
      const result = JSON.parse(data);
      const removingContact = JSON.stringify(
        result.filter(contact => contact.id !== contactId),
      );
      fs.writeFile(contactsPath, removingContact, err => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    } catch (err) {
      console.log(err);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    try {
      const result = JSON.parse(data);
      const newContact = { id: shortid.generate(), name, email, phone };
      const updateContacts = JSON.stringify([...result, newContact]);
      fs.writeFile(contactsPath, updateContacts, err => {
        if (err) throw err;
        console.log('The file has been update!');
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
