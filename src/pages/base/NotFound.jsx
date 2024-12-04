import NotFoundIcon from "../../assets/not-found.svg";

function NotFound() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center fixed inset-0 overflow-hidden">
      <img src={NotFoundIcon} alt="Not found" className="w-[250px] h-[250px] mx-auto" />
      <h1 className="text-4xl font-bold mt-4">404</h1>
      <p className="text-lg text-gray-500">Page not found</p>
    </div>
  );
}

export default NotFound;
