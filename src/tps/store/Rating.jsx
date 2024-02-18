import React from 'react'

export default function Rating({count,rate}) {
  return (
    <>
      {/* <td className='badge badge-pill badge-primary'>{rate}/{count}</td> */}
   <td>{rate}/5</td>
    </>
  )
}
