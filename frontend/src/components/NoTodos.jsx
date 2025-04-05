import React from "react";
import { ClipboardList } from "lucide-react";

const NoTodos = () => {
  return (
    <div className="text-center py-12">
      <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No todos</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new todo
      </p>
    </div>
  );
};

export default NoTodos;
