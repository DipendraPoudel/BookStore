import React,{ useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { publicFetch } from '../utils/fetch';
import FormError  from './../components/FormError';
import FormSuccess  from './../components/FormSuccess';
import { AuthContext } from '../context/AuthContext';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    // .matches("",'invalid Password')
    .required('Password is required'),
    
});


const Signin = () => {
  const initialValues = {
    email: '',
    password: ''
};
  const authContext = useContext(AuthContext);
  const [signinSuccess, setSiginSuccess] = useState();
  const [signinError, setSigninError] = useState();
  const [redirectOnlogin, setRedirectOnlogin] = useState(false);
  
  const submitCredentials = async credentials => {


    try {
      const { data } = await publicFetch.post('authenticate', credentials);
      console.log(data);

      authContext.setAuthState(data);
      setSiginSuccess(data.message);
      setSigninError('');
      // redirect user
      setTimeout(() => {
        setRedirectOnlogin(true);
        
      }, 700);
   

    } catch (error) {
     
      const { data } = error.response;
      signinError(data.message);
      setSiginSuccess(null);
    }
  };




  return (
    <div className="container">
      {redirectOnlogin && <Redirect to= "/dashboard" />}
       <div className="signin-form pb-3">
       <Formik initialValues={initialValues} 
        validationSchema={SigninSchema} onSubmit={submitCredentials}>
            {({ errors, touched, isSubmitting }) => (
              
                
                   <Form>
                   <h2>Sign In</h2>
                   
                    <div className="card-body">
                    {signinSuccess && (
                          <FormSuccess text={signinSuccess} />
                        )}
                        {signinError && (
                          <FormError text={signinError} />
                        )}
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                    
                            <div className="form-group ">
                                <label>Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group ">
                              <Link to="/forgot-password">Forgot your Password? </Link>
                                
                            </div>
                    
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Sign In
                            </button>
                            
                        </div>
                    </div>
                    <div className="text-center">Don't have an account? <Link to="/signup">Sign Up</Link ></div>		 
                </Form>
            )}
        </Formik>
          </div>
          
  </div>
 
  )
}

export default Signin;
