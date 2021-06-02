import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import contacts from '../api/contacts';
import CardContact from './ContactCard';


const ContactList = (props) => {
    // console.log(props); contact object
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }
    const inputElement = useRef("");
    const renderContactList = props.contacts.map((contact) => {
        return (
            <CardContact
                contact={contact}
                clickHandler={deleteContactHandler}
                key={contact.id} />
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputElement.current.value);
    };

    return (
        <div className="ui main">
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right floated">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputElement}
                        type="text"
                        placeholder="Search Contact"
                        className="prompt"
                        value={props.term}
                        onChange={getSearchTerm}
                    />
                    <i className="search icon" />
                </div>
            </div>
            <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No Contacts available.!"}</div>

        </div>
    );
};

export default ContactList;