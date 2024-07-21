"use client";
import useCart from "@/lib/use-cart";

export default function LiveCardCount() {
  const { count } = useCart();

  return (
    <p className="bg-primary text-background rounded-xl p-1">{count}</p>
  )
}