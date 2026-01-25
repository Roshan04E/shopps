import LatestProducts from '@/components/sections/latest-products';
import HomePage from '@/pages/home-page'
import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/action-cart';

async function Home() {
  const session =await auth();
  const cart = await getMyCart();

  return (
    <>
      <HomePage cart={cart}>
        <LatestProducts cart={cart} />
      </HomePage>
    </>
  )
}

export default Home






