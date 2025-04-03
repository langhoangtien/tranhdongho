import { useState, useEffect } from "react";
import {
  Bell,
  HeartIcon,
  LucideIcon,
  MessageSquareMoreIcon,
  TimerResetIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";

interface Notification {
  id: number;
  message: string;
  read: boolean;
  link?: string;
  time: string;
  icon: LucideIcon;
}

const fetchNotifications = (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          message: "Bạn có đơn hàng mới!",
          read: false,
          link: "/admin/orders",
          time: "10 phút trước",
          icon: HeartIcon,
        },
        {
          id: 2,
          message: "Bạn có email mới từ John Doe.",
          read: false,
          link: "/admin/emails",
          time: "30 phút trước",
          icon: MessageSquareMoreIcon,
        },
        {
          id: 3,
          message: "Hệ thống sẽ bảo trì vào lúc 2AM.",
          read: true,
          time: "1 ngày trước",
          icon: TimerResetIcon,
        },
      ]);
    }, 3000);
  });
};

export default function NotificationBell() {
  const [notifList, setNotifList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchNotifications().then((data) => {
      setNotifList(data);
      setLoading(false);
    });
  }, []);

  const markAsRead = (id: number, link?: string) => {
    setNotifList((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    if (link) {
      navigate({ to: link });
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-6 h-6" />
          {notifList.some((n) => !n.read) && (
            <span className="absolute top-0 right-0 block h-2 w-2 bg-primary rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-w-full p-4  shadow-md rounded-md">
        <h4 className="text-base font-semibold mb-2">Thông báo</h4>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : notifList.length > 0 ? (
          <ul className="space-y-2">
            {notifList.map((notif) => (
              <li
                key={notif.id}
                className={`p-2 rounded-md cursor-pointer border-b bg-accent border-borrder `}
                onClick={() => markAsRead(notif.id, notif.link)}
              >
                <div className="justify-start items-center  flex  space-x-2 ">
                  <Button size="icon" variant="ghost">
                    {" "}
                    <notif.icon className="text-primary" />
                  </Button>

                  <div className="flex flex-col space-y-1">
                    <span className="flex justify-between items-center space-x-1">
                      {" "}
                      <span className="line-clamp-1"> {notif.message}</span>
                      {!notif.read && (
                        <span className="size-1.5 rounded-full bg-blue-500" />
                      )}
                    </span>

                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Không có thông báo.</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
