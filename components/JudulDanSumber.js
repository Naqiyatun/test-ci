import React from 'react'

const JudulDanSumber = ({judul, sumber}) => {
    return (
        <div>
            <h5 className='h5 mb_4'>{judul}</h5>
            <p className='p_small sumber_data'>Sumber: {sumber}</p>
        </div>
    )
}

export default JudulDanSumber