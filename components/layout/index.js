import React from 'react'
import Footer from './Footer'
import Image from 'next/image'

const Layout = ({ children }) => {
    return (
        <div className='layout'>
			<div className='vec_rlv vector_1'>
            	<Image src='/assets/images/Vector 1.png' fill className='vec_abs' alt='Vector' />
			</div>
			<div className='vec_rlv vector_2'>
            	<Image src='/assets/images/Vector 2.png' fill className='vec_abs' alt='Vector' />
			</div>
                { children }
            <Footer />
        </div>
    )
}

export default Layout