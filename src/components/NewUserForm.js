import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const NewUserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    status && setUsers((users) => [...users, status]);
  }, [status]);

  return (<>
    <Form>
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type="text" name="name" placeholder="Name" />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
      {touched.tos && errors.tos && <p>{errors.tos}</p>}
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept Terms of Service
      </label>
      <button type="submit">Submit</button>
    </Form>
    {users.length > 0
      && users.map((user) => <p key={user.data.email}>{user.data.name}</p>)
    }
  </>);
};

export default withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .max(255, "Your name isn't that long")
      .required(),
    email: Yup.string()
      .email('Email not valid')
      .required(),
    password: Yup.string()
      .min(8, 'Password must be 8 characters or longer')
      .required(),
    tos: Yup.bool()
      .oneOf([true], 'You must agree to the Terms of Service'),
  }),

  handleSubmit(values, { setStatus }) {
    (async () => {
      setStatus(await axios.post('https://reqres.in/api/users', values));
    })();
  },
})(NewUserForm);
