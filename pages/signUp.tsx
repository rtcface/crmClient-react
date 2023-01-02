import { useFormik } from 'formik';

import * as Yup from 'yup';

import React,{ useState } from 'react'
import Layout from '../components/Layout';

import { useMutation,gql } from '@apollo/client';
import { FormValues } from '../Interfaces/FormValues';

const MUTATION =gql`
  mutation addUser($input: UserInput!){
    addUser(input: $input) {
      id
      createAt
      email
      name
      lastName   
    }
  }
`;

const signUp = () => {

let loading = false;
const mes = (email: string) => {
  return `el usuario con el email ${email} se registro con exito!!!`
};

  // State for the message 
const [ message, saveMessage] = useState(null);
  
  const [ addUser ] = useMutation(MUTATION);

// console.log(data);
// console.log('Err',error);
// console.log('Load',loading);

  const formik = useFormik({
    initialValues:{
      name: '',
      lastName: '',
      email: '',
      password:''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('El nombre es obligatorio')
        .min(2,'El nombre debe tener al menos 2 carateres'),
      lastName: Yup.string()
        .required('El apellido es obligatorio'),
      email: Yup.string()
        .email('El email no es valido')
        .required('El email es obligatorio'),
      password: Yup.string()
        .min(6,'la contrasenia debe tener al menos 6 digitos')
        .required('El password no puede estar vacio')      
    })
    ,
    onSubmit: async values =>{
      console.log('send...');
      console.log(values);
      try {
        const { data } = await addUser({
          variables:{
            input: values
          }
        });

        saveMessage(null);
      } catch (error: any) {
       saveMessage(error.message.replace('GraphQL error: ',''));
       setTimeout(() =>{
        saveMessage(null);
       },3000)
      } 
    } 
  });
  
  //  if(loading) return (<>
  //   <Layout>
  //     <h1 className="text-center text-3xl text-white font-light">Cargando...</h1>   
  //   </Layout>
  //  </>);

  const showMessage = () =>{
      return (<div className='bg-white py-2 px-3 max-w-sm text-center mx-auto'>
                <p> {message} </p>
              </div>);
  }

return (
  <>
    <Layout>
      {message && showMessage() }
      <div>
        <h1 className='text-center text-2xl text-white font-light'>Crear nueva cuenta</h1>
      </div>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form onSubmit={formik.handleSubmit}
          className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>
                Nombre
              </label>
              <input 
                id="name"
                type="text"
                placeholder="Nombre Usuario"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline" 
              />
            </div>
            {
              formik.touched.name && formik.errors.name ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-700 text-red-800 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{ formik.errors.name }</p>
                </div>
              ) : null
            }
            <div className='mb-4'>
              <label htmlFor="lastName" className='block text-gray-700 text-sm font-bold mb-2'>
                Apellido
              </label>
              <input 
                id="lastName"
                type="text"
                placeholder="Apellido Usuario"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline" 
              />
            </div>
            {
              formik.touched.lastName && formik.errors.lastName ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-700 text-red-800 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{ formik.errors.lastName }</p>
                </div>
              ) : null
            }
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>
                Email
              </label>
              <input 
                id="email"
                type="email"
                placeholder="Email Usuario"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline" 
              />
            </div>
            {
              formik.touched.email && formik.errors.email ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-700 text-red-800 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{ formik.errors.email }</p>
                </div>
              ) : null
            }
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <input 
                id="password"
                type="password"
                placeholder="Password Usuario"
                value={formik.values.password}
                onChange={ formik.handleChange }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline" 
              />
            </div>
            {
              formik.touched.password && formik.errors.password ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-700 text-red-800 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{ formik.errors.password }</p>
                </div>
              ) : null
            }
            <input 
            type="submit"
            className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
            value="Crear Cuenta" 

            />
          </form>
        </div>
      </div>    
    </Layout>
  </>
)
  
}

export default signUp