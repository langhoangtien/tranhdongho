import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { orderSchema } from "./order-schema";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";
import { useDebounce } from "@/hooks/use-debounce";
import { Select } from "../ui/select-custom";
import { Loader2, MinusIcon, PlusIcon, Trash } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface Variant {
  _id: string;
  name: string;
  price: number;
  salePrice: number;
  stock: number;
  attributes: { name: string; value: string }[];
  image: string;
  productId: string;
}

interface IVariantCart {
  productId: string;
  variantId: string;
  name: string;
  quantity: number;
  price: number;
  attributes: { name: string; value: string }[];
}
const INIT_FORM_DATA = {
  products: [],
  total: 0,
  email: "",
  status: "PENDING",
  paymentMethod: "paypal",
  name: "",
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "US",
    phone: "",
  },
};
export default function OrderForm({ id }: { id?: string }) {
  const [formData, setFormData] = useState<{
    products: IVariantCart[];
    total: number;
    email: string;
    status: string;
    paymentMethod: string;
    name: string;
    logisticPartner?: string;
    trackingNumber?: string;
    isSendEmail?: boolean;
    paymentId?: string;

    shippingAddress: {
      fullName: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
      phone: string;
    };
  }>(INIT_FORM_DATA);

  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const debounceQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  const validateForm = () => {
    const result = orderSchema.safeParse(formData);

    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path.join(".")] = err.message;
      });
      setErrors(errorMap);
      console.log(errorMap);

      return false;
    }
    setErrors({});
    return true;
  };

  const fetchOrder = async (id: string) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
      const res = await fetch(`${API_URL}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
      const data = await res.json();
      const total = data.products.reduce(
        (sum: number, item: IVariantCart) => sum + item.price * item.quantity,
        0
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, ...dataClone } = data;
      dataClone.total = total;
      setFormData(dataClone);
    } catch (error) {
      console.error(error);
      toast.error("Không thể lấy dữ liệu review, thử lại sau!");
    }
  };
  useEffect(() => {
    if (id) {
      fetchOrder(id);
    } else {
      setFormData(INIT_FORM_DATA);
    }
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem(STORAGE_KEY);
        if (!token) throw new Error("Unauthorized: No token found");

        const res = await fetch(
          `${API_URL}/products?page=${1}&limit=10&search=${debounceQuery}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch Product");

        const data = await res.json();
        const variantsData = data.data.flatMap(
          (product: { name: string; variants: Variant[] }) =>
            product.variants.map((variant: Variant) => ({
              ...variant,
              name: product.name, // Thêm name của product vào mỗi variant
            }))
        );
        setVariants(variantsData);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [debounceQuery]);

  // Lọc sản phẩm dựa trên input

  // Thêm sản phẩm vào danh sách đơn hàng
  const addProduct = (product: Variant) => {
    setFormData((prev: typeof formData) => {
      const exists = prev.products.find(
        (p: IVariantCart) => p.variantId === product._id
      );
      if (exists) return prev; // Không thêm trùng sản phẩm

      const updatedProducts = [
        ...prev.products,
        {
          productId: product.productId,
          name: product.name,
          variantId: product._id,
          quantity: 1,
          price: product.salePrice,
          attributes: product.attributes,
        },
      ];

      return {
        ...prev,
        products: updatedProducts,
        total: updatedProducts.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    });

    setOpen(false);
  };

  // Xóa sản phẩm khỏi danh sách
  const removeProduct = (id: string) => {
    setFormData((prev) => {
      const updatedProducts = prev.products.filter(
        (p: IVariantCart) => p.variantId !== id
      );
      return {
        ...prev,
        products: updatedProducts,
        total: updatedProducts.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    });
  };

  // Cập nhật giá trị input
  const updateField = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Cập nhật giá trị địa chỉ giao hàng
  const updateShippingField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Validate và Submit
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const payload = {
        ...formData,
        total: formData.products.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      const res = await fetch(`${API_URL}/orders${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save order");

      toast.success(`${id ? "Cập nhật" : "Tạo mới"} thành công`);
      navigate({ to: "/admin/orders" });
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to save orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-6 border mx-auto w-full rounded-lg ">
      <h2 className="text-xl font-semibold mb-4">Tạo Đơn Hàng</h2>

      <fieldset disabled={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="col-span-1">
            <div className="w-full relative" ref={dropdownRef}>
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Tìm sản phẩm..."
                onFocus={() => setOpen(true)}
              />

              <div
                className={`absolute w-full bg-background border border-border rounded-md shadow-lg mt-0 z-10 transition-all duration-200 ease-in-out ${
                  open
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                }`}
              >
                {variants.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    {variants.map((variant) => (
                      <button
                        key={variant._id}
                        onClick={() => addProduct(variant)}
                        className="block w-full px-4 py-2 text-left rounded-md hover:bg-accent transition"
                      >
                        <p>
                          {variant.name} - {variant.salePrice} đ
                        </p>
                        <p className="text-sm text-gray-500">
                          {variant.attributes
                            ?.map((attr) => `${attr.name}: ${attr.value}`)
                            .join(", ")}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="p-2 text-gray-500">Không tìm thấy sản phẩm</p>
                )}
              </div>
            </div>

            {/* Danh sách sản phẩm đã chọn */}
            {formData.products.length > 0 && (
              <ul className="mt-3 space-y-2">
                {formData.products.map((product: IVariantCart, index) => (
                  <li
                    key={product.variantId}
                    className="flex justify-between items-center p-2  rounded-md"
                  >
                    <div className="w-80">
                      <p className="text-accent-foreground line-clamp-2">
                        {product.name}{" "}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.attributes
                          ?.map(
                            (att: { name: string; value: string }) =>
                              `${att.name}: ${att.value}`
                          )
                          .join(", ")}{" "}
                      </p>
                    </div>
                    <QuantityCart
                      quantity={product.quantity}
                      updateQuantity={(newQuantity) => {
                        setFormData((prev) => {
                          const updatedProducts = prev.products.map((p, i) => {
                            if (i === index) {
                              return { ...p, quantity: newQuantity };
                            }
                            return p;
                          });
                          return {
                            ...prev,
                            products: updatedProducts,
                            total: updatedProducts.reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            ),
                          };
                        });
                      }}
                    />
                    <Input
                      type="number"
                      className="w-24"
                      value={product.price}
                      onChange={(e) => {
                        setFormData((prev) => {
                          const updatedProducts = prev.products.map((p, i) => {
                            if (i === index) {
                              return { ...p, price: Number(e.target.value) };
                            }
                            return p;
                          });
                          return {
                            ...prev,
                            products: updatedProducts,
                            total: updatedProducts.reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            ),
                          };
                        });
                      }}
                    />

                    <p className="text-primary">
                      {product.price * product.quantity} $
                    </p>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(product.variantId)}
                    >
                      <Trash size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4">
              <p className="text-xl font-semibold">
                Tổng cộng:{" "}
                {formData.products.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}{" "}
                USD
              </p>
            </div>
          </div>
          <div className="col-span-1  flex flex-col gap-4">
            <p className="text-xl font-semibold">Khách hàng</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block font-medium">Email *</label>
                <Input
                  aria-invalid={!!errors.email}
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Nhập email"
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block font-medium">Tên khách hàng</label>
                <Input
                  aria-invalid={!!errors.name}
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Nhập tên"
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>
            </div>
            <p className="text-xl font-semibold">
              Đơn hàng{" "}
              <span className="text-gray-500 text-base">
                {formData.paymentId}
              </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block font-medium">Đơn vị vận chuyển</label>
                <Input
                  aria-invalid={!!errors.logisticPartner}
                  value={formData.logisticPartner}
                  onChange={(e) =>
                    updateField("logisticPartner", e.target.value)
                  }
                  placeholder="Đơn vị vận chuyển"
                />
                {errors.logisticPartner && (
                  <p className="text-destructive text-sm">
                    {errors.logisticPartner}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block font-medium">Mã vận đơn</label>
                <Input
                  aria-invalid={!!errors.trackingNumber}
                  value={formData.trackingNumber}
                  onChange={(e) =>
                    updateField("trackingNumber", e.target.value)
                  }
                  placeholder="Mã vận đơn"
                />
                {errors.trackingNumber && (
                  <p className="text-destructive text-sm">
                    {errors.trackingNumber}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block font-medium">Trạng thái</label>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="PENDING">Chờ xử lý</option>
                  <option value="COMPLETE">Hoàn thành</option>
                  <option value="REFUNDED">Đã hoàn tiền</option>
                  <option value="CANCELLED">Đã hủy</option>
                </Select>
              </div>
              <div className="col-span-1">
                <label className="block font-medium">
                  Phương thức thanh toán
                </label>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={(e) => updateField("paymentMethod", e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="paypal">Paypal</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </Select>
              </div>
            </div>
            <p className="text-xl font-semibold">Địa chỉ</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="col-span-1">
                <label className="block font-medium">Tên người nhận</label>

                <Input
                  value={formData.shippingAddress?.fullName}
                  onChange={(e) =>
                    updateShippingField("fullName", e.target.value)
                  }
                  placeholder="Tên người nhận"
                />
                {errors["shippingAddress.fullName"] && (
                  <p className="text-destructive text-sm">
                    {errors["shippingAddress.fullName"]}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block font-medium">SĐT</label>
                <Input
                  aria-invalid={!!errors["shippingAddress.phone"]}
                  value={formData.shippingAddress?.phone}
                  onChange={(e) => updateShippingField("phone", e.target.value)}
                  placeholder="Số điện thoại"
                />
                {errors["shippingAddress.phone"] && (
                  <p className="text-destructive text-sm">
                    {errors["shippingAddress.phone"]}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block font-medium">Địa chỉ</label>
                <Input
                  value={formData.shippingAddress?.address}
                  onChange={(e) =>
                    updateShippingField("address", e.target.value)
                  }
                  placeholder="Địa chỉ"
                />
                {errors["shippingAddress.address"] && (
                  <p className="text-destructive text-sm">
                    {errors["shippingAddress.address"]}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block font-medium">Thành phố</label>
                <Input
                  value={formData.shippingAddress?.city}
                  onChange={(e) => updateShippingField("city", e.target.value)}
                  placeholder="Thành phố"
                />
                {errors["shippingAddress.city"] && (
                  <p className="text-destructive text-sm">
                    {errors["shippingAddress.city"]}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block font-medium">Mã bưu điện</label>
                <Input
                  value={formData.shippingAddress?.postalCode}
                  onChange={(e) =>
                    updateShippingField("postalCode", e.target.value)
                  }
                  placeholder="Mã bưu điện"
                />
                {errors["shippingAddress.postalCode"] && (
                  <p className="text-destructive text-sm">
                    {errors["shippingAddress.postalCode"]}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <label className="block font-medium">Quốc gia</label>
                <Select
                  name="country"
                  value={formData.shippingAddress?.country}
                  onChange={(e) =>
                    updateShippingField("country", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="VN">Việt Nam</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="DK">Đan Mạch</option>
                  <option value="NO">Na Uy</option>
                </Select>

                {errors["shippingAddress.country"] && (
                  <p className="text-destructive text-sm">
                    {errors["shippingAddress.country"]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      {/* Nút Submit */}
      <div className="flex justify-end mt-6">
        {" "}
        <Button onClick={handleSubmit} type="submit">
          {loading && <Loader2 strokeWidth={1.25} className="animate-spin" />}{" "}
          Lưu lại
        </Button>
      </div>
    </div>
  );
}

interface QuantityCartProps {
  quantity: number;
  updateQuantity: (newQuantity: number) => void;
}

export const QuantityCart: React.FC<QuantityCartProps> = ({
  quantity,
  updateQuantity,
}) => {
  return (
    <div className="relative flex items-center max-w-[7rem]">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="border-r-0 rounded-r-none"
        disabled={quantity === 1}
        onClick={() => updateQuantity(Math.max(1, quantity - 1))}
      >
        <MinusIcon />
      </Button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="border-y-[1px] border-border h-9 text-center  text-sm font-normal w-full py-2.5"
      />
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="border-l-0 rounded-l-none"
        onClick={() => updateQuantity(quantity + 1)}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
