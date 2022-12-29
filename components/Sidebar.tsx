import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Import CSS
import styles from '../styles/navbar.module.css';
// Navigation Bar
// This component will be used on all pages
const Sidebar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5 '>
      <div>
        <p className='text-white text-2xl font-black'>Crm Clientes</p>
      </div>
      <nav className='mt-5 list-none'>
        <li className={currentRoute === '/' ? "bg-cyan-800 p-2" : "p-2"}>  
          <Link href="/" className='text-white block'>       
              Clientes          
          </Link>
        </li>
        <li className={currentRoute === '/orders' ? "bg-cyan-800 p-2" : "p-2"}>  
          <Link href="/orders" className='text-white block'>            
              Pedidos             
          </Link>
        </li>
        <li className={currentRoute === '/products' ? "bg-cyan-800 p-2" : "p-2"}>  
          <Link href="/products" className='text-white block'>            
              Productos             
          </Link>
        </li>
      </nav>
    </aside>
  )
}

export default Sidebar