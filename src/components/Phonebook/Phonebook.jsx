import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import ContactForm from '../ContactsForm/ContactsForm';
import { FilterBox } from '../ContactsFilter/ContactsFilter';
import { ContactListBox } from '../ContactsList/ContactsList';
// import { useEffect } from 'react';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('componentDidMount...');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
    // console.log('parsedContacts..., ', parsedContacts);
  }, []);

  useEffect(() => {
    // console.log('componentDidUpdate...');
    // const nextContacts = contacts;
    // const prevContacts = prevContacts;
    // if (nextContacts !== prevContacts) {
    //   console.log('Обновилось поле contacts, записую contacts в LocalStorage');
    //   localStorage.setItem('contacts', JSON.stringify(nextContacts));
    // }
    console.log('Обновилось поле contacts, записую contacts в LocalStorage');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    // const { contacts } = this.state;
    const { name, number } = contact;
    const newContact = { id: nanoid(), name, number };

    for (const contact of contacts) {
      if (contact.name === name) {
        toast.info('This contact exist in your list');
        return;
      }
    }
    // this.setState(prevState => ({
    //   contacts: [...prevState.contacts, newContact],
    // }));

    setContacts(prevContacts => [...prevContacts, newContact]);
    // console.log('addContact..., contacts ', contacts);
  };

  const changeFilter = evt => {
    // this.setState({ filter: evt.currentTarget.value });
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizeToLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeToLowerCase)
    );
  };

  const removeContact = id => {
    // this.setState(({ contacts }) => ({
    //   contacts: contacts.filter(contact => contact.id !== id),
    // }));
    setContacts(({ contacts }) =>
      contacts.filter(contact => contact.id !== id)
    );
  };

  // const { filter } = this.state;
  const visibleContacts = this.getVisibleContacts();
  // const { addContact, changeFilter, removeContact } = this;
  return (
    <div>
      <h1 style={{ marginLeft: 30, fontSize: 32 }}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <div>
        <h2 style={{ marginLeft: 30, fontSize: 32 }}>Contacts</h2>
      </div>
      <div>
        <FilterBox value={filter} onChange={changeFilter} />
        <ContactListBox
          visibleContacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

// export class Phonebook extends Component {
//   static propTypes = {};

//   state = {
//     contacts: [],
//     filter: '',
//   };

// componentDidMount() {
//   console.log('componentDidMount...');
//   const contacts = localStorage.getItem('contacts');
//   const parsedContacts = JSON.parse(contacts);
//   if (parsedContacts) {
//     this.setState({ contacts: parsedContacts });
//   }
//   console.log('parsedContacts..., ', parsedContacts);
// }

// componentDidUpdate(prevProps, prevState) {
//   console.log('componentDidUpdate...');
//   const nextContacts = this.state.contacts;
//   const prevContacts = prevState.contacts;
//   if (nextContacts !== prevContacts) {
//     console.log('Обновилось поле contacts, записую contacts в LocalStorage');
//     localStorage.setItem('contacts', JSON.stringify(nextContacts));
//   }
// }

// addContact = contact => {
//   const { contacts } = this.state;
//   const { name, number } = contact;
//   const newContact = { id: nanoid(), name, number };

//   for (const contact of contacts) {
//     if (contact.name === name) {
//       // Notify.info('This contact exist in your list');
//       toast.info('This contact exist in your list');
//       return;
//     }
//   }
//   this.setState(prevState => ({
//     contacts: [...prevState.contacts, newContact],
//   }));
//   console.log('addContact..., contacts ', contacts);
// };

//   changeFilter = evt => {
//     this.setState({ filter: evt.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizeToLowerCase = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeToLowerCase)
//     );
//   };

//   removeContact = id => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     const { addContact, changeFilter, removeContact } = this;
//     return (
//       <div>
//         <h1 style={{ marginLeft: 30, fontSize: 32 }}>Phonebook</h1>
//         <ContactForm onSubmit={addContact} />
//         <div>
//           <h2 style={{ marginLeft: 30, fontSize: 32 }}>Contacts</h2>
//         </div>
//         <div>
//           <FilterBox value={filter} onChange={changeFilter} />
//           <ContactListBox
//             visibleContacts={visibleContacts}
//             onRemoveContact={removeContact}
//           />
//         </div>
//         <ToastContainer />
//       </div>
//     );
//   }
// }

// Phonebook.propTypes = {
//   state: PropTypes.shape({
//     contacts: PropTypes.array.isRequired,
//     filter: PropTypes.string.isRequired,
//   }).isRequired,
// };
