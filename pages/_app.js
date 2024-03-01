// import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/layout'
import React from "react";
import ContextProvider from '../config/context'
import { useRouter } from 'next/router'
import '../style/css/app.css'
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
    const pathname = router.pathname
  
	if (pathname === '/login' || pathname === '/404') {
		return (
			<>
				<Head>
					<title>PERINTIS</title>
					<meta name="description" content="Perangi Stunting, Intervensi Inflasi, Sukseskan Pengentasan Kemiskinan" />
					<link rel="icon" type='image/png' href="/assets/images/Logo Perintis.png" />
				</Head>
				<Component {...pageProps} />
			</>
		) 
	} else {
		return (
			<ContextProvider>
				<Head>
					<title>PERINTIS</title>
					<meta name="description" content="Perangi Stunting, Intervensi Inflasi, Sukseskan Pengentasan Kemiskinan" />
					<link rel="icon" type='image/png' href="/assets/images/Logo Perintis.png" />
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ContextProvider>
		)
	}
}

export default MyApp
