
const NotFound404 = () => {
  return (
    <div className="bg-background-primary text-Netral-100 h-screen w-screen flex justify-center items-center">
        <div className="flex gap-3 justify-center items-center">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-2xl font-bold">Page Not Found</h2>
        </div>

        <div className="absolute top-4 right-5">
            {/* go back */}
            <button className="bg-background-secondary shadow-sm text-white px-4 py-2 rounded-lg" onClick={() => window.history.back()}>Go Back</button>
        </div>
    </div>
  );
};

export default NotFound404;
