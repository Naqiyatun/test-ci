import React from 'react'
import { Container } from '@mui/system'
import Link from 'next/link'

export default function FourOhFour() {
    return (
        <Container fixed>
            <div className='not_found_page'>
                <img src='/assets/images/404.png' alt='404' />
                <h3 className='h3'>Halaman Tidak Ditemukan</h3>
                <p className='p_normal'>Halaman yang anda tuju tidak dapat ditemukan.</p>
                <p className='p_normal' style={{marginBottom: '30px'}}>Silahkan kembali ke halaman sebelumnya.</p>
                <Link href='/'>
                    <button className='p_normal'>Beranda</button>
                </Link>
            </div>
        </Container>
    )
}