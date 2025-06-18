import styles from "./LoginForm.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import { InputField } from "./ui/InputForm";
import { Button } from "./ui/Button";

export const LoginForm = () => {
    const { signin, clearError} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
            navigate("/dashboard");

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

                    <InputField
                    label = "メールアドレス"
                    name="email" 
                    type="email" 
                    value={email}
                    variant="default"
                    placeholder="email" 
                    size = "md"
                    disabled={loading}
                    required
                    onChange={(event) => handleChangeEmail(event)}/>
                    
                    <InputField 
                    label = "パスワード"
                    name="password" 
                    type="password" 
                    variant="default"
                    placeholder="passwords" 
                    size = "md"
                    value={password} 
                    disabled={loading}
                    required
                    onChange={(event) => handleChangePassword(event)}/>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <Button type="submit" disabled={loading} variant="primary" size="md">
                        {loading ? 'ログイン中...' : 'ログイン'}
                    </Button>

                </form>
            </div>
        </div>
    );
} 