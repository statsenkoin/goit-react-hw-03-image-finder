import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

export const Searchbar = () => {
  return (
    <header>
      <Formik initialValues={{ input: '' }} onSubmit={(values, actions) => {}}>
        <Form>
          <button type="submit">
            <span>Search</span>
          </button>
          <Field
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></Field>
        </Form>
      </Formik>
    </header>
  );

  //   return (
  //     <header className="searchbar">
  //       <form className="form">
  //         <button type="submit" className="button">
  //           <span className="button-label">Search</span>
  //         </button>

  //         <input
  //           className="input"
  //           type="text"
  //           autoComplete="off"
  //           autoFocus
  //           placeholder="Search images and photos"
  //         />
  //       </form>
  //     </header>
  //   );
};
