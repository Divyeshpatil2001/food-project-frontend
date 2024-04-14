import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    backgroundColor: '#f9f9f9', // Adjust the color as needed
    padding: theme.spacing(3), // Add some padding to the container
    borderRadius: theme.spacing(1), // Add border radius for a rounded appearance
    marginTop: theme.spacing(5), // Add margin from the top to create spacing with the header
  },
  requiredText: {
    color: 'red',
  },
}));

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Registration Form
        </Typography>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            Address1: '',
            Address2: '',
            pincode: ''
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
            phone: Yup.string().required('Phone is required'),
            Address1: Yup.string().required('Address is required'),
            Address2: Yup.string(),
            pincode: Yup.string().required('Pincode is required')
          })}
          onSubmit={async (values, { setSubmitting, setErrors,errors }) => {
            try {
              const response = await axios.post('http://localhost:8000/accounts/RegisterUserAPI/', values);
              console.log("Registered user:", response.data);
              setSubmitting(false);
              navigate('/login');
            } catch (error) {
              console.log("Invalid registration:", error);
              setErrors({ submit: "Problem during registration" });
            }
          }}
        >
          {({ isSubmitting , errors}) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    name="first_name"
                    helperText={
                      <ErrorMessage name="first_name">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    helperText={
                      <ErrorMessage name="last_name">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Email"
                    name="email"
                    helperText={
                      <ErrorMessage name="email">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    helperText={
                      <ErrorMessage name="password">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Phone"
                    name="phone"
                    helperText={
                      <ErrorMessage name="phone">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    label="Address Line 1"
                    name="Address1"
                    helperText={
                      <ErrorMessage name="Address1">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    label="Address Line 2"
                    name="Address2"
                    helperText={
                      <ErrorMessage name="Address2">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    helperText={
                      <ErrorMessage name="pincode">
                        {(msg) => <span className={msg ? classes.requiredText : ''}>{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
                sx={{margin:"15px",}}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Register;

