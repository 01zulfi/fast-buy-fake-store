"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import useCart from "@/lib/use-cart";
import Header from "../header";

export default function Cart() {
  const { cart, total, updateQuantity, remove } = useCart();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="my-6 mx-10">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-primary my-10">
          Cart
        </h2>
        {cart && cart.length > 0 ? (
          <>
            <Table className="w-full sm:w-2/3">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell><Input value={product.quantity} onChange={(v) => {
                      if (parseInt(v.target.value) < 1) {
                        return;
                      }
                      updateQuantity(product.id, parseInt(v.target.value));
                    }} type="number" className="w-[100px]" /></TableCell>
                    <TableCell className="text-right">{product.price * product.quantity}</TableCell>
                    <TableCell>
                      <Button variant="destructive" onClick={() => remove(product.id)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right font-bold text-base">${total}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    </main>
  )
}