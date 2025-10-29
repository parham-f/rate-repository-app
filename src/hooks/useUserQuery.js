import { useContext } from "react";
import MeContext from "../contexts/meContext";

const useUserQuery = () => {
    return useContext(MeContext);
};

export default useUserQuery;