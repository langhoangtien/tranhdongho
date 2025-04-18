import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "@/config";
import MainLayout from "@/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <AboutUs />
    </MainLayout>
  );
}

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-center text-3xl font-semibold my-8">About Us</h2>
      <div>
        <div className="space-y-2 my-4">
          <h1 className="text-lg font-semibold">Về Chúng Tôi</h1>
          <p>
            Cơ sở sản xuất tranh Đông Hồ nằm tại{" "}
            <b>Đông Hồ, Song Hồ, Thuận Thành, Bắc Ninh</b>, là nơi lưu giữ và
            phát triển nghề làm tranh dân gian truyền thống của Việt Nam. Đây là
            một trong những địa phương nổi tiếng nhất với nghệ thuật vẽ tranh
            Đông Hồ, nơi các nghệ nhân vẫn tiếp tục duy trì những quy trình thủ
            công tỉ mỉ đã có từ hàng trăm năm.
          </p>
          <p>
            Tranh Đông Hồ nổi bật với màu sắc tươi sáng, các hình ảnh biểu tượng
            và câu chuyện dân gian phong phú, phản ánh đời sống, văn hóa và
            phong tục của người Việt. Cơ sở sản xuất tranh của chúng tôi không
            chỉ là nơi tạo ra những tác phẩm nghệ thuật độc đáo mà còn là nơi
            bảo tồn những giá trị văn hóa truyền thống của dân tộc.
          </p>

          <h2>Quy Trình Sản Xuất Tranh Đông Hồ</h2>
          <p>
            Quy trình sản xuất tranh Đông Hồ là một chuỗi các công đoạn thủ công
            truyền thống, từ việc chọn nguyên liệu, khắc gỗ, in tranh đến tô
            màu. Mỗi công đoạn đều đòi hỏi sự khéo léo và tỉ mỉ của các nghệ
            nhân.
          </p>
          <ul className="list-disc px-4 list-inside space-y-2">
            <li>
              <strong>Khắc Gỗ:</strong> Các nghệ nhân khắc hình ảnh lên tấm gỗ
              để làm khuôn in. Đây là bước đầu tiên và rất quan trọng, đòi hỏi
              sự tinh tế để thể hiện các chi tiết nhỏ nhất.
            </li>
            <li>
              <strong>In Tranh:</strong> Sau khi khắc xong, gỗ được dùng để in
              lên giấy hoặc vải. Đặc biệt, các nghệ nhân sử dụng một loại mực
              đặc biệt để đảm bảo tranh có màu sắc đẹp và bền lâu.
            </li>
            <li>
              <strong>Tô Màu:</strong> Màu sắc của tranh Đông Hồ được tạo nên từ
              các nguyên liệu tự nhiên như vỏ sò, hoa hòe, lá cây, đất, mang lại
              sự tươi sáng và bền màu theo thời gian. Đây cũng là yếu tố khiến
              tranh Đông Hồ khác biệt với các loại tranh khác.
            </li>
          </ul>

          <h2>Giá Trị Văn Hóa Và Nghệ Thuật</h2>
          <p>
            Tranh Đông Hồ không chỉ là một loại hình nghệ thuật mà còn là sự
            phản ánh tinh tế đời sống và văn hóa của người Việt qua các thời kỳ.
            Mỗi bức tranh đều mang trong mình một câu chuyện, một thông điệp về
            sự hạnh phúc, bình an, tài lộc, hay thậm chí là các yếu tố phong
            thủy trong cuộc sống. Những bức tranh này đã và đang là món quà tinh
            thần giá trị đối với nhiều thế hệ.
          </p>
          <p>
            Việc sản xuất tranh Đông Hồ không chỉ giúp bảo tồn một phần quan
            trọng trong di sản văn hóa dân gian mà còn đóng góp vào sự phát
            triển của nghệ thuật truyền thống Việt Nam. Chúng tôi luôn nỗ lực
            giữ gìn và phát huy nghề làm tranh Đông Hồ để thế hệ mai sau có thể
            tiếp nối và cảm nhận vẻ đẹp của loại hình nghệ thuật này.
          </p>

          <h2>Địa Chỉ Cơ Sở</h2>
          <p>
            Địa chỉ cơ sở: <b>{CONTACT_ADDRESS}</b> Đây là nơi mà các nghệ nhân
            gắn bó suốt đời với nghề, nơi mà mỗi bức tranh được tạo ra không chỉ
            là một sản phẩm mà còn là kết quả của sự sáng tạo và tình yêu dành
            cho nghề truyền thống.
          </p>

          <h2>Cam Kết Của Chúng Tôi</h2>
          <p>
            Chúng tôi cam kết mang đến cho khách hàng những tác phẩm tranh Đông
            Hồ chất lượng cao nhất, giữ gìn sự tinh túy của nghệ thuật dân gian
            Việt Nam. Mỗi bức tranh do chúng tôi sản xuất đều được làm bằng tay
            với sự chăm chút và tỉ mỉ. Chúng tôi tin rằng mỗi bức tranh Đông Hồ
            không chỉ là một món quà nghệ thuật mà còn là một phần không thể
            thiếu trong văn hóa Việt.
          </p>
        </div>
        <p>
          <strong>Address:&nbsp;{CONTACT_ADDRESS}, Vietnam</strong>
        </p>
        <p>
          <strong>Email:&nbsp;</strong>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            title=""
            role="url"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            <strong>{CONTACT_EMAIL}</strong>
          </a>
        </p>
        <p>
          <strong>Phone:&nbsp;{CONTACT_PHONE}</strong>
        </p>
      </div>
    </div>
  );
}
