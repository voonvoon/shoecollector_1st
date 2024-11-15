import React from "react";
import { useFormStatus } from "react-dom";

const AuthButton = () => {
  const { pending } = useFormStatus();  // useFormStatus returns an object with a pending property that indicates whether the form is currently being submitted.
  return (
    <button
      disabled={pending}
      type="submit"
      className={`${
        pending ? "bg-gray-600" : "bg-blue-600"
      } flex items-center justify-center relative h-12 overflow-hidden rounded-full border-0 bg-[#374151] bg-opacity-100 py-2.5 px-8 text-white text-opacity-100 no-underline hover:no-underline transition-colors duration-300 hover:text-gray-200 mt-6 shadow-md hover:bg-opacity-90 w-full`}
    >
      {pending ? "Loading..." : "Sign in"}
    </button>
  );
};

export default AuthButton;