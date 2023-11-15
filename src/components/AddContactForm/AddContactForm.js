import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label } from './AddContactForm.styled';
import * as Yup from 'yup';
import 'yup-phone';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactsItems } from 'redux/selectors';
import { addContact } from 'redux/operations';

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Name required'),
  phone: Yup.string()
    .matches(
      '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
      'Doesn`t look like phone number'
    )
    .required('Phone number Required'),
});

export function AddContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsItems);

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={Schema}
      onSubmit={(values, action) => {
        if (contacts.some(con => con.name === values.name)) {
          alert('Contact with this name already exist');
          return;
        }
        if (contacts.some(con => con.phone === values.phone)) {
          alert('Contact with this phone already exist');
          return;
        }
        dispatch(addContact(values));
        action.resetForm();
      }}
    >
      <Form>
        <Label>
          Name
          <Field name="name" type="text" placeholder="Enter name" />
          <ErrorMessage name="name" component="p" />
        </Label>
        <Label>
          Phone number
          <Field name="phone" type="tel" placeholder="Enter phone number" />
          <ErrorMessage name="phone" component="p" />
        </Label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
