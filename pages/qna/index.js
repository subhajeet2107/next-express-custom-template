import Head from 'next/head'
import {useState, useEffect } from 'react'

export default function QnA() {
  const [yollo, setYollo] = useState(false)
  useEffect(()=>{
    setYollo(true)
  },[])
  
  return(
    <>
    <Head>
      <title>Index Page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
      {yollo ? <h2>index World</h2>:<h2>Hum pawri karenge</h2>}
    </>
  )
}