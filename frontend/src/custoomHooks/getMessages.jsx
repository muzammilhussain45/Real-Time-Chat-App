import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setOtherUsers } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";




const getMessages = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    let dispatch = useDispatch();
    let userData = useSelector((state) => state.user.userData);
    let selectedUser = useSelector((state) => state.user.selectedUser);

    useEffect(() => {
        if (!userData || !selectedUser) return;
        
        const fetchMessages = async () => {
            try {
                let result = await axios.get(`${backendUrl}/api/message/get/${selectedUser._id}`, { withCredentials: true });
                dispatch(setMessages(result.data));
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchMessages();
    }, [selectedUser,userData, dispatch, backendUrl])

}


export default getMessages;