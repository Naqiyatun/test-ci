import Image from 'next/image'
import React from 'react'

const FormSimpleSearch = ({ placeholder, action, value }) => {
    return (
        <div className='form_simple_search'>
            <Image src='/assets/icons/Icon Search.svg' width={24} height={24} alt='Search' />
            <input className='p_normal' type='search' placeholder={placeholder} onChange={action} value={value} />
        </div>
    )
}

export default FormSimpleSearch