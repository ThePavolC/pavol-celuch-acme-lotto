import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useCachedAuth from "./useCachedAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();
    const { cachedAuth } = useCachedAuth();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Token ${
                        auth.token || cachedAuth.token
                    }`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        };
    }, [auth, cachedAuth]);

    return axiosPrivate;
};

export default useAxiosPrivate;
