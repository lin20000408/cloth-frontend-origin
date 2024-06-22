import React from 'react'

const ProductDetail = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Tag: {product.tag_name}</p>
      <p>Main Category: {product.mt_name}</p>
      <p>Sub Category: {product.st_name}</p>
      <p>Material: {product.ma_name}</p>
      <p>Color: {product.color_name}</p>
      <img src={product.ph1} alt={product.name} />
      {/* 你可以在這裡渲染更多產品詳細信息 */}
    </div>
  )
}

export default ProductDetail
