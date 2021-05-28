import React from 'react';
import { Link } from 'react-router-dom';
import CardContact from './ContactCard';


const ContactList = (props) => {
    // console.log(props); contact object
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map((contact) => {
        return (
            <CardContact
                contact={contact}
                clickHandler={deleteContactHandler}
                key={contact.id} />
        );
    });
    return (
        <div className="ui main">
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right floated">Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list">{renderContactList}</div>

        </div>
    );
};

export default ContactList;