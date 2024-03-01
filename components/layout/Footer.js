import { Container } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <Container fixed>
                <div className='flex_logo'>
                    <Image src='/assets/images/Logo Pemkot.png' width={189} height={50} alt='Logo Pemkot' />
                    <Image src='/assets/images/Logo Kominfo.png' width={189} height={50} alt='Logo Kominfo' />
                    {/* <Image src='/assets/images/Logo BSRE.png' width={113} height={50} alt='Logo BSRE' /> */}
                </div>
            </Container>
        </footer>
    )
}

export default Footer