import React, {useState, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { publicFetch } from '../utils/fetch';
import FormError  from './../components/FormError';
import FormSuccess  from './../components/FormSuccess';
import { AuthContext } from './../context/AuthContext';



const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required(
    'First name is required'
  ),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    // .matches("",'invalid Password')
    .required('Password is required'),
    confirmPassword:  Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
    acceptTerms: Yup.bool()
    .oneOf([true], 'Accept Terms & Conditions is required')
});


const Signup = () => {
  const initialValues = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    };
  const authContext = useContext(AuthContext)
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [redirectOnlogin, setRedirectOnlogin] = useState(false);

  const submitCredentials = async credentials => {

    try {
      const { data } = await publicFetch.post('signup', credentials);
      authContext.setAuthState(data);
      setSignupSuccess(data.message);

      setSignupError('');
      setTimeout(() => {
        setRedirectOnlogin(true);
        
      }, 1000);
    } catch (error) {
      const { data } = error.response;
      setSignupError(data.message); 
      setSignupSuccess('');
      
     }
  };

  return (
   
    
    <div className="container">
      {redirectOnlogin && <Redirect to= "/dashboard" />}
       <div className="signup-form pb-3">
       <Formik initialValues={initialValues} 
        validationSchema={SignupSchema} onSubmit={submitCredentials}>
            {({ errors, touched, isSubmitting }) => (
              
                <Form>
                   <h2>Sign Up</h2>
                   
                    <div className="card-body">
                    {signupSuccess && (
                          <FormSuccess text={signupSuccess} />
                        )}
                        {signupError && (
                          <FormError text={signupError} />
                        )}
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-6">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group form-check">
                            <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                            <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Sign Up
                            </button>
                            
                        </div>
                    </div>
                    <div className="text-center">Already have an account? <Link to="/signin">Sign In</Link ></div>		 
                </Form>
            )}
        </Formik>
          </div>
          
  </div>
 
  
  )
}

export default Signup;
