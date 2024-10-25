import { lang } from "@/helpers";
import { Link } from "react-router-dom";

export const NotFoundView = () => {

    const redirectProducts =
    process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_CORE_API_DEV_URL
        : import.meta.env.VITE_CORE_API_PROD_URL

    return (
        <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
            <div className="text-center">
                <img
                    src="./images/logo_mini.svg"
                    alt="Logo Mini"
                    className="object-cover w-full mx-auto max-w-64"
                />
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    {lang("404.title")}
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    {lang("404.text")}
                </p>
                <div className="flex items-center justify-center mt-10 gap-x-6">
                    <Link
                        to={`${redirectProducts}/products`}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {lang("404.button")}
                    </Link>
                </div>
            </div>
        </main>
    );
};
