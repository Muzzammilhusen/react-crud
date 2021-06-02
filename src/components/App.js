import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from '../api/contacts';
import './App.css';
import { uuid } from 'uuidv4';
import Header from './Header';
import AddContact from './AddContact';
import EditContact from "./EditContact";
import ContactList from './ContactList'
import ContactDetail from './ContactDetail';

function App() {

  // const LOCAL_STORAGE_KEY = "contacts"; // due use of to json server local storage not require now
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // Retrive Contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact); //contact object
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    console.log(response);// contact added response

    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    //console.log(response.data);// updated data log
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ").
          toLowerCase().
          includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)));
    // if (retriveContacts) setContacts(retriveContacts); // commentout for fetch data from json server instaed of local storage
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )} />
          <Route path="/edit"
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler} />
            )} />
          <Route path="/" exact render={(props) =>
          (<ContactList {...props}
            contacts={searchTerm.length < 1 ? contacts : searchResult}
            getContactId={removeContactHandler}
            term={searchTerm}
            searchKeyword={searchHandler}
          />)} />
          <Route path="/contact/:id"
            component={ContactDetail} />
        </Switch>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
