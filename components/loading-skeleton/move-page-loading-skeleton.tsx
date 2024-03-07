export default function MovePageLoadingSkeleton() {
  return (
    <div className="relative w-full z-50">
      <div className="fixed inset-0 bg-[#f0f8ff] opacity-50">
        <div className="flex flex-col items-center justify-center h-screen">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#334155"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              fill="#334155"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="font-semibold">Processing...</p>
        </div>
      </div>
    </div>
  );
}
