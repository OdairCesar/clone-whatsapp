import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Clone WhatsApp</title>
        <meta name="description" content="Aplicativo criado para clonar a interface do WhatsApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar></Sidebar>
    </div>
  )
}
