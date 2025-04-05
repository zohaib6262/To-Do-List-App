import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings as SettingsIcon, User, Key } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const settingsCategories = [
    {
      title: "Account",
      icon: <User className="h-5 w-5" />,
      description: "Manage your account settings and preferences",
    },

    {
      title: "Password",
      icon: <Key className="h-5 w-5" />,
      description: "Update your password",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              navigate(`/settings/${category.title.toLowerCase()}`)
            }
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                {category.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
