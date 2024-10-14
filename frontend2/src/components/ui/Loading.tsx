import { PuffLoader } from "react-spinners";

export const Loading = () => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm backdrop-opacity-15">
            <div className="flex items-center justify-center min-h-screen">
                <PuffLoader color="#d68336" size={150} />
            </div>
        </div>
    );
};
