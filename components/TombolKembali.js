import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const TombolKembali = ({link}) => {
    return (
        <Link href={link}>
            <div className='flex_back_button mb_30'>
                <Image src='/assets/icons/Icon Arrow Left.svg' width={18} height={14} alt='Arrow' />
                <p className='p_normal'>Kembali</p>
            </div>
        </Link>
    )
}

export default TombolKembali