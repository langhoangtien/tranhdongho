import { Card, CardContent } from "@/components/ui/card";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  CameraIcon,
  UserRoundIcon,
  KeyRoundIcon,
  SettingsIcon,
} from "lucide-react";
import { useState } from "react";

import InfoTab from "./info";
import PasswordChange from "./password-change";
import Setting from "./setting";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/auth";
import { convertIDToURL } from "@/lib/utils";

const tabs = [
  { name: "info", icon: UserRoundIcon, title: "Thông tin" },
  { name: "password", icon: KeyRoundIcon, title: "Đổi mật khẩu" },
  { name: "setting", icon: SettingsIcon, title: "Cài đặt" },
];
export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [tabActive, setTabActive] = useState(tabs[0]);
  const auth = useAuth();
  const user = auth.user;

  const avatar = convertIDToURL(user?.image || "");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      <div className="col-span-4 md:col-span-1">
        <Card>
          <CardContent className="flex flex-col justify-center space-y-10">
            <div className="flex flex-col items-center justify-center space-y-3">
              <input
                onChange={handleFileChange}
                type="file"
                id="avatar"
                name="avatar"
                className="hidden"
              />
              <label className="relative" htmlFor="avatar">
                <Avatar className="size-16">
                  <AvatarImage
                    className="object-cover"
                    src={avatarUrl || avatar}
                    alt={user?.username}
                  />
                </Avatar>
                <div className="group absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center rounded-full bg-slate-400/10 p-1 transition-colors duration-200 hover:bg-slate-400/50">
                  <CameraIcon className="size-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </label>
              <div className="flex flex-col space-y-1">
                <p className="text-xl font-semibold">{user?.fullName}</p>
                <p className="text-gray-600">Full Stack Developer</p>
              </div>
              <div className="flex space-x-2">
                <FacebookIcon strokeWidth={1} />
                <TwitterIcon strokeWidth={1} />
                <LinkedinIcon strokeWidth={1} />
              </div>
            </div>

            <div className="flex w-full justify-around space-x-3">
              <span>
                <p className="font-semibold">86</p>
                <p>Posts</p>
              </span>
              <span>
                <p className="font-semibold">40</p>
                <p>Project</p>
              </span>
              <span>
                <p className="font-semibold">4.5k</p>
                <p>Members</p>
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {tabs.map((tab) => (
                <Button
                  onClick={() => setTabActive(tab)}
                  key={tab.name}
                  className={`flex h-8 justify-start border-none ${tab.name === tabActive.name && "bg-blue-50 dark:bg-slate-700"}`}
                  variant="outline"
                >
                  <tab.icon />
                  {tab.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-4 md:col-span-3">
        {tabActive.name == "info" && <InfoTab />}
        {tabActive.name == "password" && <PasswordChange />}
        {tabActive.name == "setting" && <Setting />}
      </div>
    </div>
  );
}
