import Breadcrumbs from "@/components/ui/breadcrumbs";
import { API_URL } from "@/config";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/emails/$emailId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { emailId } = useParams({ strict: false });
  return <EmailView id={emailId} />;
}

interface IEmail {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  status: "sent" | "failed" | "draft" | "queued";
}

const EmailView: React.FC<{ id: string }> = ({ id }) => {
  const [email, setEmail] = useState<IEmail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: No token found");
        const response = await fetch(`${API_URL}/emails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch email");
        }
        const emailData: IEmail = await response.json();
        setEmail(emailData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!email) return <div>Email not found</div>;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "App", href: "/admin" },
          { label: "Danh sách", href: "/admin/emails" },
          { label: "Email", isCurrent: true }, // Trang hiện tại không có href
        ]}
      />
      <div className="max-w-7xl p-6 mx-auto  rounded-lg w-full ">
        <h2 className="text-xl font-semibold mb-2">Email Details</h2>
        <div className="mb-2">
          <span className="font-bold">From:</span> {email.sender}
        </div>
        <div className="mb-2">
          <span className="font-bold">To:</span> {email.recipient}
        </div>
        <div className="mb-2">
          <span className="font-bold">Subject:</span> {email.subject}
        </div>
        <div className="mb-2">
          <span className="font-bold">Status:</span>
          <span
            className={`ml-2 px-2 py-1 text-sm rounded-full 
            ${email.status === "sent" ? "bg-green-200 text-green-700" : ""}
            ${email.status === "failed" ? "bg-red-200 text-red-700" : ""}
            ${email.status === "draft" ? "bg-gray-200 text-gray-700" : ""}
            ${email.status === "queued" ? "bg-yellow-200 text-yellow-700" : ""}
          `}
          >
            {email.status}
          </span>
        </div>
        <div className="mt-4 p-3 border rounded-md bg-gray-100">
          <span className="font-bold">Message:</span>
          <div
            className="col-span-2 tiptap"
            dangerouslySetInnerHTML={{ __html: email.body }}
          ></div>
        </div>
      </div>
    </div>
  );
};
