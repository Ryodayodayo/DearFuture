import styles from "./LoginForm.module.css"
import { useState } from "react"
import { useAuth } from '../contexts/AuthContext';
import { AuthInputField } from "./ui/AuthInputField";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
    const { signup, clearError} = useAuth();
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
            await signup(email, password);
            console.log("サインアップ成功");
            alert ("サインアップしました。");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("サインアップエラー:", error);
            setError("サインアップに失敗しました。メールアドレスとパスワードを確認してください。");
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
                <h1 className = {styles.h1}>ユーザー登録</h1>
                <form onSubmit={handleSubmit} className = {styles.form}>

                    <AuthInputField
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
                    
                    <AuthInputField 
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
                        {loading ? 'サインアップ中...' : 'サインアップ'}
                    </Button>

                </form>
            </div>
        </div>
    );
} 