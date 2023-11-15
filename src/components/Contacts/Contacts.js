import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectContactsItems, selectFilter } from 'redux/selectors';

export function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsItems);
  const filter = useSelector(selectFilter);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  return (
    <>
      <ul>
        {getFilteredContacts().length > 0 ? (
          getFilteredContacts().map(({ id, name, phone }) => (
            <li key={id}>
              {name}: {phone}{' '}
              <button type="button" onClick={() => dispatch(deleteContact(id))}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </ul>
    </>
  );
}
