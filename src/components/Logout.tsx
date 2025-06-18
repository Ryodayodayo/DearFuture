import { useState } from "react"
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom"

export const Logout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        
        try {
            await logout(); //authContext側でルートに遷移するように設定してる
            console.log("ログアウト完了");
            alert("ログアウトしました");

        } catch (error: any) {
            console.error("ログアウトエラー:", error);
            setError("ログアウトに失敗しました");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={loading}>
                {loading ? "ログアウト中..." : "ログアウト"}
            </button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};