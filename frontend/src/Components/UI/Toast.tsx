import { useEffect } from "react";

// Toast Component
const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    // Set a timeout to auto-close the toast after 30 seconds (30000 milliseconds)
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Clear the timeout if the component is unmounted to avoid memory leaks
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-blue-gradient border border-gray-200 rounded-xl shadow-lg fixed top-5 right-5 z-50"
      role="alert"
      aria-labelledby="hs-toast-condensed-label"
      style={{ animation: "slide-in 0.3s ease-out" }} // Add custom animation
    >
      <div className="flex p-4">
        <p id="hs-toast-condensed-label" className="text-sm text-overlay-dark-100">
          {message}
        </p>

        <div className="ms-auto flex items-center space-x-3">
          {/* Close button */}
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-overlay-dark-100 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="sr-only text-overlay-dark-100">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
