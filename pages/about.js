import Head from 'next/head'
import {useState, useEffect } from 'react'

export default function About() {
  const [yollo, setYollo] = useState(false)
  useEffect(()=>{
    setYollo(true)
  },[])
  
  return(
    <>
    <Head>
      <title>About Page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
      {yollo ? <h2>Hello World</h2>:<h2>Hum pawri karenge</h2>}
    </>
  )
}