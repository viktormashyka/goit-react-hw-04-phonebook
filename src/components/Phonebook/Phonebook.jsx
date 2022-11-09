import React from 'react';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { ContactForm } from '../ContactsForm/ContactsForm';
import { FilterBox } from '../ContactsFilter/ContactsFilter';
import { ContactListBox } from '../ContactsList/ContactsList';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    console.log('Обновилось поле contacts, записую contacts в LocalStorage');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const { name, number } = contact;
    const newContact = { id: nanoid(), name, number };

    for (const contact of contacts) {
      if (contact.name === name) {
        toast.info('This contact exist in your list');
        return;
      }
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = evt => {
    setFilterContacts(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizeToLowerCase = filterContacts.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeToLowerCase)
    );
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <h1 style={{ marginLeft: 30, fontSize: 32 }}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <div>
        <h2 style={{ marginLeft: 30, fontSize: 32 }}>Contacts</h2>
      </div>
      <div>
        <FilterBox value={filterContacts} onChange={changeFilter} />
        <ContactListBox
          visibleContacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};
