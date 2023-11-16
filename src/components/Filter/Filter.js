import { useDispatch } from 'react-redux';
import { Label } from './Filter.styled';
import React from 'react';
import { changeFilter } from 'redux/filterSlice';

export function Filter() {
  const dispatch = useDispatch();
  return (
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
  );
}
