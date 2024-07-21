import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/lib/api';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from "next/link";
import Header from './header';
import AddToCartButton from './add-to-cart';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="my-6 mx-10">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-primary my-10">
          All products
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-12'>
          {products.map(product => (
            <div className="flex flex-col p-4 border-2 rounded gap-2 shadow-lg">
              <img src={product.image} alt={product.title} className='w-[200px] aspect-square' />
              <h3 className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{product.title}</h3>
              <p className="font-bold self-end">$ {product.price}</p>
              <AddToCartButton
                product={product}
                buttonProps={{ variant: 'outline', className: 'w-full' }}
              />
              <Link href={`/product/${product.id}`} className='w-full'>
                <Button className='w-full gap-2 items-center'>
                  Details
                  <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
