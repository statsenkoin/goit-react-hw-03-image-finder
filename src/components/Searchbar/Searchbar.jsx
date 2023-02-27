import React from 'react';
// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={{ input: '' }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values.input);
          resetForm();
        }}
      >
        <SearchForm>
          <SearchButton type="submit">
            <BiSearchAlt />
          </SearchButton>
          <SearchInput
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></SearchInput>
        </SearchForm>
      </Formik>
    </Header>
  );
};
