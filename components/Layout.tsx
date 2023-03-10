import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

const Layout = ({children}:any) => {
  
  const router = useRouter();
  
  return (
    <>
        <Head>
            <title>CRM - Administracion de clientes</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css"/>
        <script src="https://cdn.tailwindcss.com"></script>
         </Head>
         { router.pathname === '/login' || router.pathname === '/signUp' ? 
         (
         <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
            <div>{children}</div>
         </div>
         ) : (
          <div className='bg-neutral-200 min-h-screen'>
            <div className='flex min-h-screen'>
            <Sidebar/>
                <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5 '>
                    {children}
                </main> 
            </div>            
          </div>
         )  
        }         
    </>
  )
}

export default Layout