import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.jpg';

const CardContact = (props) => {

    const { id, name, email } = props.contact;
    return (
        <div className="item">
            <img className="ui mini circular image" src={user} alt="user" />
            <div className="content">
                <Link to={{ pathname: `/contact/:${id}`, state: { contact: props.contact } }}>
                    <div className="header">{name}</div>
                    <div className="header">{email}</div>
                </Link>
            </div>
            <i className="trash alternate outline icon right floated"
                style={{ color: " red", marginTop: "7px" }}
                onClick={() => props.clickHandler(id)}></i>
        </div >
    );
};

export default CardContact;