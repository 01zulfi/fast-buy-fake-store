import Header from "@/app/header"
import { getProduct } from "@/lib/api"
import AddToCartButton from "../../add-to-cart"

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(parseInt(params.id))

  return (
    <main>
      <Header />
      <div className="flex flex-col sm:flex-row p-8 border-2 gap-4">
        <img src={product.image} alt={product.title} className="w-full sm:w-1/4" />
        <div className="flex flex-col gap-6">
          <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">{product.title}</h2>
          <p>{product.description}</p>
          <p>Rating: {product.rating.rate} ({product.rating.count})</p>
          <p className="font-bold text-primary text-xl">Price: ${product.price}</p>
          <AddToCartButton product={product} buttonProps={{ className: "w-fit" }} />
        </div>
      </div>
    </main>
  )
}
