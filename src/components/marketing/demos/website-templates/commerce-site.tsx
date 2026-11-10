"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart, Search, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrowserChrome } from "./browser-chrome";

type Page = "home" | "shop" | "product" | "cart";

const products = [
  {
    id: "essentials",
    name: "Essentials kit",
    price: "€84",
    tag: "Bestseller",
    tone: "from-[#0f766e] to-[#134e4a]",
  },
  {
    id: "refill",
    name: "Refill pack",
    price: "€39",
    tag: "Restock",
    tone: "from-[#115e59] to-[#0c1a1f]",
  },
  {
    id: "drop",
    name: "Limited drop tee",
    price: "€48",
    tag: "New",
    tone: "from-[#1e3a3a] to-[#071216]",
  },
  {
    id: "bundle",
    name: "Starter bundle",
    price: "€119",
    tag: "Save 15%",
    tone: "from-[#0d9488] to-[#0c1a1f]",
  },
];

export function CommerceSiteDemo() {
  const reduce = useReducedMotion();
  const [page, setPage] = useState<Page>("home");
  const [cartCount, setCartCount] = useState(0);
  const [activeProduct, setActiveProduct] = useState(products[0]);

  function openProduct(id: string) {
    const product = products.find((item) => item.id === id) ?? products[0];
    setActiveProduct(product);
    setPage("product");
  }

  return (
    <div className="flex h-full flex-col bg-[#faf7f2] text-[#1a1510]">
      <BrowserChrome domain="harborgoods.com" accent="bg-[#f0ebe3]" />

      <header className="flex items-center justify-between gap-3 border-b border-[#e5ddd0] bg-[#faf7f2] px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => setPage("home")}
          className="font-display text-xl font-semibold tracking-tight"
        >
          Harbor Goods
        </button>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {[
            { id: "home" as const, label: "Home" },
            { id: "shop" as const, label: "Shop" },
            { id: "product" as const, label: "Featured" },
            { id: "cart" as const, label: "Cart" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
              className={cn(
                "transition",
                page === item.id ? "font-semibold text-[#0f766e]" : "text-[#6b6258]"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#e5ddd0] sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage("cart")}
            className="relative inline-flex h-9 items-center gap-2 rounded-full bg-[#1a1510] px-3 text-sm text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0f766e] text-[10px] font-bold">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-[#e5ddd0] px-3 py-2 md:hidden">
        {(["home", "shop", "product", "cart"] as Page[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPage(item)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize",
              page === item ? "bg-[#1a1510] text-white" : "bg-[#f0ebe3] text-[#6b6258]"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={page + activeProduct.id + cartCount}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {page === "home" ? (
              <>
                <section className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="flex flex-col justify-end bg-[#1a1510] px-6 py-14 text-[#faf7f2] sm:px-10 sm:py-20">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#9bb5ad]">
                      Spring drop
                    </p>
                    <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95]">
                      Goods that feel as considered as your brand.
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                      A real storefront layout — merchandising, product cards, and cart —
                      not a brochure pretending to sell.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="bg-[#0f766e] hover:bg-[#0d5f59]"
                        onClick={() => setPage("shop")}
                      >
                        Shop all
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/25 bg-transparent text-white hover:bg-white/10"
                        onClick={() => openProduct("essentials")}
                      >
                        View bestseller
                      </Button>
                    </div>
                  </div>
                  <div className={`min-h-[280px] bg-gradient-to-br ${products[0].tone} p-6 sm:min-h-[420px]`}>
                    <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-white/70">
                        <span>Featured</span>
                        <Heart className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-display text-3xl font-semibold">Essentials kit</p>
                        <p className="mt-2 text-sm text-white/70">€84 · Free shipping over €75</p>
                        <Button
                          className="mt-4 bg-white text-[#1a1510] hover:bg-white/90"
                          onClick={() => {
                            setCartCount((c) => c + 1);
                            setPage("cart");
                          }}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="px-5 py-10 sm:px-8">
                  <div className="mb-5 flex items-end justify-between">
                    <h2 className="font-display text-2xl font-semibold">Trending now</h2>
                    <button
                      type="button"
                      className="text-sm font-medium text-[#0f766e]"
                      onClick={() => setPage("shop")}
                    >
                      View all
                    </button>
                  </div>
                  <ProductGrid
                    onOpen={openProduct}
                    onAdd={() => setCartCount((c) => c + 1)}
                  />
                </section>
              </>
            ) : null}

            {page === "shop" ? (
              <section className="px-5 py-8 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#0f766e]">Shop</p>
                    <h2 className="mt-2 font-display text-3xl font-semibold">All products</h2>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {["All", "Essentials", "Drops", "Bundles"].map((filter, index) => (
                      <span
                        key={filter}
                        className={cn(
                          "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                          index === 0
                            ? "bg-[#1a1510] text-white"
                            : "border border-[#e5ddd0] text-[#6b6258]"
                        )}
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <ProductGrid
                    onOpen={openProduct}
                    onAdd={() => setCartCount((c) => c + 1)}
                  />
                </div>
              </section>
            ) : null}

            {page === "product" ? (
              <section className="grid gap-0 lg:grid-cols-2">
                <div className={`min-h-[320px] bg-gradient-to-br ${activeProduct.tone} p-8`}>
                  <div className="flex h-full min-h-[280px] items-end rounded-[1.75rem] border border-white/20 bg-white/10 p-6 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-white/70">
                        {activeProduct.tag}
                      </p>
                      <p className="mt-3 font-display text-4xl font-semibold">
                        {activeProduct.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-10 sm:px-10">
                  <div className="flex items-center gap-1 text-[#0f766e]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-xs text-[#6b6258]">128 reviews</span>
                  </div>
                  <h2 className="mt-3 font-display text-4xl font-semibold">
                    {activeProduct.name}
                  </h2>
                  <p className="mt-2 text-2xl font-semibold text-[#0f766e]">
                    {activeProduct.price}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6b6258]">
                    Product detail page with price, social proof, and a clear add-to-cart —
                    the conversion surface e-commerce actually needs.
                  </p>
                  <div className="mt-6 flex gap-2">
                    {["S", "M", "L", "XL"].map((size, index) => (
                      <span
                        key={size}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium",
                          index === 1
                            ? "bg-[#1a1510] text-white"
                            : "border border-[#e5ddd0] text-[#6b6258]"
                        )}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className="mt-8 w-full bg-[#1a1510] hover:bg-black sm:w-auto"
                    onClick={() => {
                      setCartCount((c) => c + 1);
                      setPage("cart");
                    }}
                  >
                    Add to cart
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </section>
            ) : null}

            {page === "cart" ? (
              <section className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
                <h2 className="font-display text-3xl font-semibold">Your cart</h2>
                {cartCount === 0 ? (
                  <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#e5ddd0] bg-white p-8 text-center">
                    <p className="text-sm text-[#6b6258]">Cart is empty — add something from Shop.</p>
                    <Button className="mt-4" onClick={() => setPage("shop")}>
                      Browse products
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {Array.from({ length: Math.min(cartCount, 3) }).map((_, index) => {
                      const product = products[index % products.length];
                      return (
                        <div
                          key={`${product.id}-${index}`}
                          className="flex items-center gap-4 rounded-2xl border border-[#e5ddd0] bg-white p-4"
                        >
                          <div
                            className={`h-16 w-16 rounded-xl bg-gradient-to-br ${product.tone}`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-[#6b6258]">{product.price}</p>
                          </div>
                          <span className="text-sm text-[#6b6258]">Qty 1</span>
                        </div>
                      );
                    })}
                    <div className="rounded-2xl bg-[#1a1510] p-5 text-white">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Subtotal</span>
                        <span className="font-semibold">
                          €{84 + Math.max(0, cartCount - 1) * 39}
                        </span>
                      </div>
                      <Button className="mt-4 w-full bg-[#0f766e] hover:bg-[#0d5f59]">
                        Checkout
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProductGrid({
  onOpen,
  onAdd,
}: {
  onOpen: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="group overflow-hidden rounded-[1.25rem] border border-[#e5ddd0] bg-white"
        >
          <button
            type="button"
            onClick={() => onOpen(product.id)}
            className={`relative block h-40 w-full bg-gradient-to-br ${product.tone}`}
          >
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1a1510]">
              {product.tag}
            </span>
          </button>
          <div className="p-4">
            <button
              type="button"
              onClick={() => onOpen(product.id)}
              className="text-left"
            >
              <p className="font-medium">{product.name}</p>
              <p className="mt-1 text-sm text-[#0f766e]">{product.price}</p>
            </button>
            <Button
              size="sm"
              variant="outline"
              className="mt-3 w-full border-[#e5ddd0]"
              onClick={onAdd}
            >
              Add
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
