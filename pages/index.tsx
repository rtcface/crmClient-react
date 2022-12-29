
import { Inter } from '@next/font/google'
import Layout from '../components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Clientes</h1>
    </Layout>
  )
}
