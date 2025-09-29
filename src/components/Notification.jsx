import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Notification() {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    useEffect(() => {
        if (!token) return;

        // Connect ke backend websocket
        const socket = new WebSocket(`${import.meta.env.VITE_BASE_URL_WS}/ws?token=${token}`);

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socket.onmessage = (event) => {
            console.log("📩 New message:", event.data);
            toast.success(event.data, {
                position: "top-right",
                duration: 4000,
            });
        };

        socket.onclose = () => {
            console.log("❌ WebSocket disconnected");
        };

        return () => {
            socket.close();
        };
    }, [token, dispatch]);

    return null;
}
