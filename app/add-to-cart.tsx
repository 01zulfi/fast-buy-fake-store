"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button, ButtonProps } from "@/components/ui/button"
import type { Product, ProductStorage } from "@/lib/types"
import useCart from "@/lib/use-cart"

interface Props {
  product: Product
  buttonProps: ButtonProps
}

export default function AddToCartButton({ product, buttonProps }: Props) {
  const { add } = useCart();
  const { toast } = useToast();

  function addToCart() {
    add(product);
    toast({
      description: `${product.title} added to cart`,
    })
  }

  return (
    <Button
      {...buttonProps}
      onClick={addToCart}
    >
      Add to Cart
    </Button>
  )
}