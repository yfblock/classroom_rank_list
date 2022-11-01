import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rustlings 排行榜</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Rustlings 排行榜
        </h1>

        <p className={styles.description}>
          Get started by opening{' '}
          <a href='https://github.com/os2edu/rustlings'>rustlings</a>
        </p>

      </main>

    </div>
  )
}
