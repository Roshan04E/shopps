import React from 'react'
import { getMyCart } from '@/lib/actions/action-cart'
import { getAllProducts } from '@/lib/actions/action-products'
import MenuPage from './menu-page'
import Pagination from '@/components/pagination'
import { searchProducts } from '@/lib/actions/action-products'


async function Menu({searchParams}: {searchParams: Promise<{ page: string, search: string }>}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || '';

  const cart = await getMyCart() 
  const {data: products, totalPages} = await searchProducts({
    query: search,
    page,
    limit: 8
  })

  
  return (
    <div className='pt-20'>
      <MenuPage products={products} cart={cart} initialSearch={search} />
      <Pagination page={Number(page)} totalPages={totalPages}/>
    </div>
  )
}

export default Menu

