import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import './login.css'
import axios from 'axios';
import { useEffect } from 'react';



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);


  


  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={ async (values, { setSubmitting }) => {
          try {
            await dispatch(loginUser(values,navigate));
          } catch (error) {
            console.log("Error:", error);
          } finally {
            setSubmitting(false);
          }
        }
      }
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            {error && <div className="error-message">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
