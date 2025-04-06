import { createFileRoute, Link } from "@tanstack/react-router";
import OrderCompleteIllustration from "@/assets/illustrations/order-complete-illustration";
import { MotionContainer } from "@/components/animate/motion-container";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, CloudDownloadIcon } from "lucide-react";
export const Route = createFileRoute("/order-complete")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderComplete />;
}

function OrderComplete() {
  return (
    <div className="flex flex-col items-center justify-center min-h-80 h-screen">
      <MotionContainer>
        <h1 className="text-3xl text-center font-bold">Đặt hàng thành công!</h1>

        <OrderCompleteIllustration />
        <p> Order #: {Math.floor(100000 + Math.random() * 900000)}</p>
        <p className="text-center text-gray-500">
          Cảm ơn bạn đã mua hàng. Nhân viên của chúng tôi sẽ liên hệ với bạn
          trong thời gian sớm nhất để xác nhận đơn hàng.
        </p>
        <div className="flex space-x-8">
          <Link to="/">
            <Button variant="outline">
              <ChevronLeftIcon strokeWidth={1.5} /> Mua sắm tiếp
            </Button>
          </Link>
          <Button>
            Tải hóa đơn <CloudDownloadIcon strokeWidth={1.5} />
          </Button>
        </div>
      </MotionContainer>
    </div>
  );
}
