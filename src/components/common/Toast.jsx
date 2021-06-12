import { ToastContainer, toast } from "react-toastify";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import "react-toastify/dist/ReactToastify.css";

export default function Toast(props) {
  return (
    <ToastContainer
      toastClassName={() =>
        `bg-white text-gray-900 rounded-md shadow-md border border-gray-200 flex px-3 py-4 min-h-10 overflow-hidden cursor-pointer my-1`
      }
      hideProgressBar
      {...props}
    />
  );
}

export function notify(message, type, position) {
  switch (type) {
    case "success": {
      return toast(
        <div className="flex items-center break-all">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          <span>{message}</span>
        </div>,
        {
          position,
        }
      );
    }
    case "danger": {
      return toast(
        <div className="flex items-center break-all">
          <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
          <span>{message}</span>
        </div>,
        {
          position,
        }
      );
    }
    case "warning": {
      return toast(
        <div className="flex items-center break-all">
          <ExclamationIcon className="h-5 w-5 text-yellow-500 mr-2" />
          <span>{message}</span>
        </div>,
        {
          position,
        }
      );
    }
    case "info": {
      return toast(
        <div className="flex items-center break-all">
          <ExclamationCircleIcon className="h-5 w-5 text-yellow-300 mr-2" />
          <span>{message}</span>
        </div>,
        {
          position,
        }
      );
    }
    default: {
      return toast(
        <div className="flex items-center">
          <ExclamationCircleIcon className="h-5 w-5 text-yellow-300 mr-2" />
          <span>{message}</span>
        </div>,
        {
          position,
        }
      );
    }
  }
}
