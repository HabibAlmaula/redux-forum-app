import { LoaderCircle } from "lucide-react";

export const Preload = () => (
  <>
    <div className="h-screen w-full flex justify-center items-center">
      <LoaderCircle
        className="animate-spin text-blue-700 dark:text-blue-200 "
        size={70}
      />
    </div>
  </>
);
