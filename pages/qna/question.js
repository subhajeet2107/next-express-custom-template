import Head from 'next/head'
import {useState, useEffect } from 'react'

function QnAQuestion({query}) {

  const [yollo, setYollo] = useState(false)
  useEffect(()=>{
    setYollo(true)
  },[])
  
  return(
    <>
    <Head>
      <title>{`QnA Question is ${query.slug}`}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

      <h2>{`Title of the question is ${query.slug}`}</h2>
    </>
  )
}

export async function getServerSideProps({query}) {
    return {props:{query}}
}

export default QnAQuestion