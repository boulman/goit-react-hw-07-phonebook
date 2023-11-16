import { useDispatch, useSelector } from 'react-redux';
import { Label } from './Filter.styled';
import React from 'react';
import { changeFilter } from 'redux/filterSlice';
import { selectContactsItems } from 'redux/selectors';

export function Filter() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsItems);
  return (
    contacts.length > 0 && (
      <Label>
        Find contacts by name
        <input
          type="text"
          name="search"
          placeholder="Enter search"
          onChange={e =>
            dispatch(changeFilter(e.target.value.trim().toLowerCase()))
          }
        />
      </Label>
    )
  );
}
