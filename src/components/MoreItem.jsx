import React from 'react'

const MoreItem = ({title, value}) => {
    return (
        <li className='flex flex-col'>
            <span className='text-slate-400 text-[15px]'>{title}</span>
            <strong className='text-[20px]'>{value}</strong>
        </li>
    )
}

export default MoreItem