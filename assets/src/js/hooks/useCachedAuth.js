import { useContext } from "react";
import CachedAuthProviderContext from "../context/CachedAuthProvider";

const useCachedAuth = () => {
    return useContext(CachedAuthProviderContext);
};

export default useCachedAuth;
