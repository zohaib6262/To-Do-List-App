import React from "react";
import { Bell } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Todo Completed",
      message: 'You completed "Update project documentation"',
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Due Date Approaching",
      message: '"Review code changes" is due tomorrow',
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "New Feature",
      message: "Check out our new task filtering feature!",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-4 rounded-lg shadow-sm ${
              !notification.read ? "border-l-4 border-indigo-600" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {notification.title}
                </h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
              </div>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
