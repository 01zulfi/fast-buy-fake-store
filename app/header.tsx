import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BoxModelIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from "next/link";
import LiveCardCount from './LiveCartCount';

export default function Header() {
  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <BoxModelIcon className="w-8 h-8" />
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Fast Buy
          </h1>
        </Link>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          Products
        </Link>
        <Link
          href="/cart"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <div className="flex gap-2 items-center">
            Cart
            <LiveCardCount />
          </div>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <HamburgerMenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <BoxModelIcon />
              <span className="sr-only">Fast Buy</span>
            </Link>
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <div className="flex gap-2 items-center">
                Cart
                <LiveCardCount />
              </div>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <PersonIcon className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}