import { SignupForm } from "../components/SignupForm";
import styles from "./Signup.module.css";

export const Signup = () => {

    return (
        <div className={styles.signupContainer}>
            <SignupForm />
        </div>
    );

}