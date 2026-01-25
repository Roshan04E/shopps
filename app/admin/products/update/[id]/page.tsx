import React from 'react'
import UpdateProductPage from './product-update-form'
import { getProductById } from '@/lib/actions/action-products';
import { UpdateProductSchema } from '@/util/validators';
import { notFound } from 'next/navigation';

const CreateNewProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const rawData = await getProductById(id);

  if (!rawData) {
    notFound();
  }

  // 1. This "cleans" the data to match your schema exactly
  // It handles the coercion of dates/numbers and removes extra fields
  const validatedData = UpdateProductSchema.parse(rawData);

  return (
    <div className='py-6 min-h-screen max-w-7xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Edit Product: {validatedData.name}</h2>
      <div className="">
        {/* 2. Now 'product' is guaranteed to match the form's expectations */}
        <UpdateProductPage product={validatedData} />
      </div>
    </div>
  )
}

export default CreateNewProduct