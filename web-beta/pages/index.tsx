import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>秋季训练营</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
        秋季训练营
        </h2>

        <div className={styles.grid}>
          <a href="https://github.com/os2edu/rustlings" className={styles.card}>
            <h2>Rustlings &rarr;</h2>
            <p>秋季训练营 Rustlings 训练</p>
          </a>
        </div>

        
      </main>
      <p className={styles.description}>
          2022 OS 夏季训练营排行榜{' '}
          <a href='https://learningos.github.io/classroom-grading/'>点击查看</a>
        </p>
    </div>
  )
}
