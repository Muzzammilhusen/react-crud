import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png';

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
                style={{ color: " red", marginTop: "7px", marginLeft: "10px" }}
                onClick={() => props.clickHandler(id)}>
            </i>
            <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
                <i className="edit alternate outline icon right floated"
                    style={{ color: " blue", marginTop: "7px" }}
                >
                </i>
            </Link>
        </div >
    );
};

export default CardContact;