import { useRouteError } from "react-router-dom";

function ErrorBoundary2() {
    let error = useRouteError();
    console.error(error);
    return <h1 className="text-2xl text-center mt-8 font-bold text-red-500">
        Something went wrong. Please try again later.
        </h1>;
  }

export default ErrorBoundary2;