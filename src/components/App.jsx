import React, { useEffect } from 'react';
import { Container } from './App.styled';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactsError, selectContactsLoading } from 'redux/selectors';
import { fetchAllContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);
  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      {error && <p>Oops! Something went wrong...</p>}
      {!isLoading && !error && (
        <>
          <h1>Phonebook</h1>
          <AddContactForm />
          <h2>Contacts</h2>
          <Filter />
          <Contacts />
        </>
      )}
    </Container>
  );
}
