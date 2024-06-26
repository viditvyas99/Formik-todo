import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { login } from '../features/auth/authSlice'

function Login() {
    const dispatch = useDispatch()
    const {loading,error}=useSelector((state)=>{ return  state.auth})
    const validationSchema=Yup.object({
        username:Yup.string().required('required'),
        password:Yup.string().min(6,'password must be al least 6 characters').required('required')
    })
    const handleSubmit =(values,{setSubmitting})=>{
        dispatch(login(values))
        setSubmitting(false)

    }
  return (
    <div className='loginform'>
        <h1>LOGIN</h1>
        <Formik initialValues={{email:'',password:''}}validationSchema={validationSchema}onSubmit={handleSubmit}>{({isSubmitting})=>(
            <Form>
                <div>
                    <label htmlFor="username">username</label>
                    <Field name='username' type='text'/>
                    <ErrorMessage name='username' component='div'/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <Field name='password' type='text'/>
                    <ErrorMessage name='password' component='div'/>
                </div>
                {error&&<div>{error.message}</div>}
                <div className='buttonCss' >
                <button type='submit' disabled={isSubmitting||loading}>
                    {loading?'loging in ....':'login'}
                </button>
                </div>
            </Form>
        )}

        </Formik>

      
    </div>
  )
}

export default Login
