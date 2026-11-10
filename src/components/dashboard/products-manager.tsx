"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  inventory: number;
  status: "draft" | "published" | "archived";
  availability: boolean;
  description?: string;
};

export function ProductsManager({
  initialProducts,
  mode,
}: {
  initialProducts: Product[];
  mode: "live" | "sample";
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);

  function openCreate() {
    setEditing({
      id: `PRD-${String(products.length + 1).padStart(2, "0")}`,
      title: "",
      category: "",
      price: 0,
      inventory: 0,
      status: "draft",
      availability: false,
      description: "",
    });
  }

  function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === editing.id);
      if (exists) {
        return prev.map((p) => (p.id === editing.id ? editing : p));
      }
      return [...prev, editing];
    });
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-midnight">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "live"
              ? "Catalog loaded from Postgres (edits are session-local for now)."
              : "Manage catalog items (client-side demo)."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={mode === "live" ? "success" : "sample"}>
            {mode === "live" ? "Live database" : "Sample"}
          </Badge>
          <Button onClick={openCreate}>Add product</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{product.title}</CardTitle>
                <Badge
                  variant={product.status === "published" ? "success" : "outline"}
                >
                  {product.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-lg font-semibold text-midnight">
                ${product.price}
              </p>
              <p className="text-muted-foreground">
                Inventory: {product.inventory}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(product)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/40 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>
                {products.find((p) => p.id === editing.id)?.title
                  ? "Edit"
                  : "New"}{" "}
                product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    required
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      value={editing.price}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory</Label>
                    <Input
                      id="inventory"
                      type="number"
                      min={0}
                      value={editing.inventory}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          inventory: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    rows={3}
                    value={editing.description ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
