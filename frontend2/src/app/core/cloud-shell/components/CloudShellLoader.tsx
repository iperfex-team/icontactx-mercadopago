// import { Product } from "@/app/core/products/interfaces";
import { PulseLoader } from "react-spinners";

export const CloudShellLoader = () => {
    return (
        <>
            {/* <div className="text-center">
                <img
                    src="./images/logo_mini.svg"
                    alt="Logo Mini"
                    className="object-cover w-full mx-auto max-w-64"
                />
            </div> */}

            <div className="flex flex-col items-center justify-center h-full mt-2">
                <h2 className="text-2xl font-semibold text-center">
                    CloudShell loading - beta
                </h2>
                <p className="text-center">
                    Initializing reverse SSH tunnel instances. Please wait for a
                    few moments.
                </p>
                <p className="text-center">
                    The availability of users and their latency might affect the
                    time it takes for this service to become fully operational.
                </p>
                {/* <AlertInfo /> */}
                <div className="mx-auto mt-4">
                    <PulseLoader color="#fff" />
                </div>
            </div>
        </>
    );
};

import { IoAlertCircleOutline } from "react-icons/io5";

export default function AlertInfo() {
    return (
        <div className="p-4 mt-4 border-l-4 border-yellow-400 bg-yellow-50">
            <div className="flex justify-center">
                <div className="flex-shrink-0">
                    <IoAlertCircleOutline
                        className="w-5 h-5 text-yellow-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-bold text-center text-yellow-700">
                        Do not close the web.
                    </p>
                </div>
            </div>
        </div>
    );
}
