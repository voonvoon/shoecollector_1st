
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen text-blue-600">
            <AiOutlineLoading3Quarters className="animate-spin" size={30}/>
        </div>
    );
}

export default Loading;
