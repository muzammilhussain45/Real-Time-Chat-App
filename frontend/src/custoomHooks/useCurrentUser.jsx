import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUserData } from "../redux/userSlice";




const useCurrentUser = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    let dispatch = useDispatch();

    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${backendUrl}/api/user/current`, { withCredentials: true });
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchUser();
    }, [dispatch, backendUrl])

}


export default useCurrentUser;