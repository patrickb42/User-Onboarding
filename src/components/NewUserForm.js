import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const NewUserForm = ({ values, errors, touched }) => {

};

export default withFormik({
  // { username, password }
  mapPropsToValues({}) {
    return {
      // username: username || '',
      // password: password || '',
    };
  },

  validationSchema: Yup.object.shape({
    /*
     *  email: Yup.string()
     *    .email('Email not valid')
     *    .required('Email is required'),
     *  password: Yup.string()
     *    .min(8, 'Password must be 8 characters or longer')
     *    .required('Password is required'),
    **/
  }),

  // { username, password }
  handleSubmit({}) {
    // console.log(username, password);
  },
})(NewUserForm);
