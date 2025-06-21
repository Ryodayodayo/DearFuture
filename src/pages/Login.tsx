import { LoginForm } from "../components/LoginForm"
import styles from "./Login.module.css"

export const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>
    );
} 