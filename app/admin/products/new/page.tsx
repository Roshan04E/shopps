import React from 'react'
import ProductForm from './product-form'

const CreateNewProduct = async () => {
  return (
    <div className='py-6 min-h-screen max-w-380 mx-auto'>
      <h2 className='text-2xl font-bold'>Create New Product</h2>
      <div className="">
        <ProductForm />
      </div>
    </div>
  )
}

export default CreateNewProduct