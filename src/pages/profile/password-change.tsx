import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PasswordChange() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const PASSWORD_REQUIREMENTS = [
    "Minimum 8 characters long - the more, the better",
    "At least one lowercase character",
    "At least one uppercase character",
    "At least one number, symbol, or whitespace character",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    };
    let isValid = true;

    if (!formData.oldPassword) {
      tempErrors.oldPassword = "Old password is required!";
      isValid = false;
    }
    if (!formData.password) {
      tempErrors.password = "Password is required!";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters!";
      isValid = false;
    }
    if (!formData.passwordConfirmation) {
      tempErrors.passwordConfirmation = "Password confirmation is required!";
      isValid = false;
    } else if (formData.password !== formData.passwordConfirmation) {
      tempErrors.passwordConfirmation =
        "Password confirmation must match the new password!";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Đổi mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label>Mật khẩu cũ</label>
              <Input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">{errors.oldPassword}</p>
              )}

              <label>Mật khẩu mới</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <label>Xác nhận mật khẩu mới</label>
              <Input
                type="password"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.passwordConfirmation && (
                <p className="text-red-500 text-sm">
                  {errors.passwordConfirmation}
                </p>
              )}

              <div className="flex space-x-2">
                <Button type="submit">Lưu</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    setFormData({
                      oldPassword: "",
                      password: "",
                      passwordConfirmation: "",
                    })
                  }
                >
                  Hủy
                </Button>
              </div>

              <p className="text-sm font-semibold mt-4">
                Password requirements:
              </p>
              <p className="text-xs text-gray-500">
                Ensure that these requirements are met:
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs font-medium text-gray-600">
                {PASSWORD_REQUIREMENTS.map((requirement) => (
                  <div className="flex items-center gap-2" key={requirement}>
                    <div className="size-2 rounded-full bg-primary"></div>
                    <p>{requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
