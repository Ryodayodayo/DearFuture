import { useState } from "react"
import { useAuth } from '../contexts/AuthContext';

const  [ loading, setLoading ] = useState (false);
const [error, setError] = useState('');
const { logout } = useAuth();

export const Logout = async () => {
    setLoading(true);

    try {
        await logout;
        console.log ("ログアウト完了");
        alert ("ログアウトしました");
    } catch (error:any) {
        console.error("ログアウトエラー:", error);
        setError("ログアウトに失敗しました");

    } finally{
        setLoading (false);
    }
}