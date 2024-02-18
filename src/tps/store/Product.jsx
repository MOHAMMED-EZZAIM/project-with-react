import React from 'react'
import Rating from './Rating.jsx'
export default function Product({product}) {
  return (
            <tr>
              <td>{product.id}#d</td>
              <td>{product.title}Title</td>
              <td>{product.price}Price</td>
              <td>{product.description.slice(0,50)}Description</td>
              <td>{product.category}Category</td>
              <td>
                <img width={200} src={product.image} alt="" />
              </td>
            {/* <td>{product.rating.rate} {product.rating.count}</td> */}
            <Rating count={product.rating.count} rate={product.rating.rate}/>
            </tr>
  )
}

 
