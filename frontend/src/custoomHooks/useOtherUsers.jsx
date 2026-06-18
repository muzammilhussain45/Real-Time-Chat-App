import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setOtherUsers } from "../redux/userSlice";




const useOtherUsers = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    let dispatch = useDispatch();
    let userData = useSelector((state) => state.user.userData);

    useEffect(() => {
        if (!userData) return;
        
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${backendUrl}/api/user/others`, { withCredentials: true });
                dispatch(setOtherUsers(result.data));
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchUser();
    }, [userData, dispatch, backendUrl])

}


export default useOtherUsers;