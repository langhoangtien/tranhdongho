import { useCart } from "@/cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { formatVNCurrency } from "@/lib/utils";
import Image from "@/components/image";
export default function CartHeader() {
  const {
    items,
    removeItem,
    updateQuantity,
    getCartTotal,
    getCartCount,
    isOpen,
    setIsOpen,
  } = useCart();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="relative" size="icon" variant="outline">
          {!!getCartCount() && (
            <Badge className="absolute -top-2.5 -right-2 min-w-[1.25rem] min-h-[1.25rem] flex items-center justify-center rounded-full text-xs shadow">
              {getCartCount()}
            </Badge>
          )}
          <ShoppingCart strokeWidth={1} className="text-accent-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      >
        <SheetHeader>
          <SheetTitle>Giỏ hàng</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-auto py-4 border-t px-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart
                strokeWidth={1}
                className="h-12 w-12 mx-auto text-gray-300 mb-4"
              />
              <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
              <Button onClick={() => setIsOpen(false)}>Tiếp tục mua sắm</Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex border-b pb-4">
                  <div className="size-20 md:size-24 xl:size-28 relative flex-shrink-0 gap-4 md:gap-8 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover size-20 md:size-24 xl:size-28"
                    />
                  </div>
                  <div className="ml-4 flex gap-4 justify-between flex-grow md:gap-8">
                    <div className="flex flex-col flex-grow justify-center gap-1">
                      <h3 className="font-medium line-clamp-2">{item.name}</h3>
                      {!!item.title && (
                        <p className="text-gray-500 text-sm line-clamp-1">
                          {item.title}
                        </p>
                      )}
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 border-r-0 rounded-r-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus strokeWidth={1} />
                        </Button>
                        <input
                          onChange={(e) => {
                            let value = parseInt(e.target.value, 10);
                            if (isNaN(value) || value < 1) {
                              value = 1; // Đặt giá trị mặc định nếu nhập sai
                            }
                            updateQuantity(item.id, value);
                          }}
                          className="h-7 w-6 border-border border-t border-b flex items-center justify-center text-center "
                          value={item.quantity}
                        ></input>
                        <Button
                          variant="outline"
                          className="size-7 border-l-0 rounded-l-none"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus strokeWidth={1} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col shrink-0 justify-between">
                      <p className="primary font-medium mt-1">
                        {formatVNCurrency(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[var(--primary-lighter)] underline font-semibold cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <SheetFooter>
          {items.length > 0 ? (
            <div className="border-t pt-4 space-y-4 ">
              <div className="flex justify-between mb-4 text-primary">
                <span>Shipping</span>
                <span className="font-semibold">Miễn phí vận chuyển</span>
              </div>
              <div className="flex justify-between mb-4 text-primary">
                <span className="font-semibold">Tổng</span>
                <span>{formatVNCurrency(getCartTotal())}</span>
              </div>

              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="w-full">
                  Thanh toán
                </Button>
              </Link>
            </div>
          ) : (
            <SheetClose>
              {" "}
              <Button size="lg" className="w-full" variant={"outline"}>
                Tiếp tục mua sắm
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
