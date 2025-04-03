import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/components/admin/order-form";

interface OrderDetailsProps {
  order?: IOrder;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 space-y-2 ">
      {/* Thông tin khách hàng */}
      <div>
        <p>Thông tin khách hàng</p>

        <p>
          <strong>Tên:</strong> {order.name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Trạng thái:</strong> <Badge>{order.status}</Badge>
        </p>
      </div>
      <div>
        <p>Địa chỉ giao hàng</p>

        <p>
          <strong>Tên:</strong> {order.shippingAddress.fullName}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {order.shippingAddress.address},{" "}
          {order.shippingAddress.city}, {order.shippingAddress.postalCode}
        </p>
        <p>
          <strong>Quốc gia:</strong> {order.shippingAddress.country}
        </p>
        <p>
          <strong>Điện thoại:</strong> {order.shippingAddress.phone}
        </p>
        <p>
          <strong>Đối tác vận chuyển:</strong> {order?.logisticPartner}
        </p>
        <p>
          <strong>Mã theo dõi:</strong> {order?.trackingNumber}
        </p>
        <Button variant="outline" className="mt-2">
          Theo dõi đơn hàng
        </Button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="col-span-1 md:col-span-2">
        <p>Sản phẩm đã mua</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Số lượng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="line-clamp-1">{item.name}</p>
                </TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Thông tin vận chuyển */}

      {/* Thông tin thanh toán */}
      <div className="col-span-1 md:col-span-2">
        <p>Thông tin thanh toán</p>

        <p>
          <strong>Cổng thanh toán:</strong> {order.paymentGateway}
        </p>
        <p>
          <strong>Tổng tiền:</strong> ${order.total}
        </p>
        <p>
          <strong>Thuế:</strong> ${order.tax}
        </p>
        {order.paymentSource && (
          <>
            <Separator className="my-3" />
            <h4 className="text-lg font-semibold">Nguồn thanh toán</h4>
            {order.paymentSource.card && (
              <p>
                <strong>Thẻ:</strong> {order.paymentSource.card.brand} ( ****
                {order.paymentSource.card.last_digits})
              </p>
            )}
            {order.paymentSource.paypal && (
              <p>
                <strong>PayPal:</strong>{" "}
                {order.paymentSource.paypal.email_address}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
