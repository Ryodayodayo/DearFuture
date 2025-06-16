import styles from "./LoginForm.module.css"
import { useState } from "react"
import { useAuth } from '../contexts/AuthContext';

export const LoginForm = () => {
    const { signin, clearError} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event : React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            setError("メールアドレスとパスワードを入力してください");
            return;
        }
        setLoading(true);
        setError('');

        try {
            event.preventDefault();
            await signin(email, password);
            console.log("ログイン成功");
            alert ("ログインしました");

        } catch (error: any) {
            console.error("ログインエラー:", error);
            setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
        } finally {
            setLoading(false);
        }
    };


    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };
    return (
        <div className = {styles.page}>
            <div className = {styles.container}>
                <h1 className = {styles.h1}>ログイン</h1>
                <form onSubmit={handleSubmit} className = {styles.form}>
                    <div>
                    <label className = {styles.label}>メールアドレス</label>
                    <input 
                    name="email" 
                    type="email" 
                    className = {styles.field}
                    value={email}
                    placeholder="email" 
                    disabled={loading}
                    onChange={(event) => handleChangeEmail(event)}/>
                    
                    </div>
                    <div>
                    <label className = {styles.label}>パスワード</label>
                    <input 
                    name="password" 
                    type="password" 
                    className = {styles.field}
                    placeholder="password" 
                    value={password} 
                    disabled={loading}
                    onChange={(event) => handleChangePassword(event)}/>
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button className = {styles.button}>
                        {loading ? 'ログイン中...' : 'ログイン'}
                    </button>
                </form>
            </div>
        </div>
    );
} 