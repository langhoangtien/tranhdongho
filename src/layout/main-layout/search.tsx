import { Product } from "@/components/admin/product-form";
import Image from "@/components/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDebounce } from "@/hooks/use-debounce";
import { Link } from "@tanstack/react-router";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchHeader() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([]);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:3000/products?search=${debouncedQuery}&limit=5`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <SearchIcon
            strokeWidth={1}
            className="size-4 cursor-pointer"
          ></SearchIcon>
        </Button>
      </SheetTrigger>
      <SheetContent showClose={false} side={"top"}>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="w-full flex flex-row space-x-4 justify-center items-center p-4">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="small_filled"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block z-50 rounded-lg px-2.5 pb-2 border pt-5 w-full text-sm text-gray-700  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset appearance-none peer"
              placeholder=" "
            />
            <label
              htmlFor="small_filled"
              className="absolute text-base text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] start-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Search
            </label>
            {query && (
              <Card className="absolute left-0 z-10 top-12 w-full rounded-b-md rounded-t-none  shadow-lg">
                <CardContent className="p-2">
                  {loading && (
                    <p className="text-center text-gray-500">Loading...</p>
                  )}
                  {!loading && products.length === 0 && (
                    <p className="text-center text-gray-500">
                      No products found
                    </p>
                  )}
                  {!loading && (
                    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                      <p className="text-xs font-semibold text-gray-500 border-b  border-border pb-2 mb-2">
                        PRODUCTS
                      </p>
                      {products.map((product) => (
                        <Link
                          key={product._id}
                          to={`/products/${product.slug}`}
                        >
                          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent ">
                            <Image
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                ${product.minPrice?.toFixed(2)}
                                {product.minCompareAtPrice && (
                                  <span className="ml-2 text-red-500 line-through">
                                    ${product.minCompareAtPrice.toFixed(2)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <SheetClose asChild>
            <X
              strokeWidth={1}
              className="h-7 w-7 text-gray-700 cursor-pointer"
            />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
