import { createContext, useContext, useState, useEffect} from "react"
import { User, UserCredential, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
    signup: (email: string, password: string) => Promise<UserCredential>;
    signin: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    clearError: () => void;
}


interface AuthProviderProps {
    children : React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error ("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({children} : AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false); 
        });

        return unsubscribe;
    }, []); 

    // サインアップ
    const signup = async (email:string, password:string) => {
        try {
            setError(null);
            const result = await createUserWithEmailAndPassword(auth,email,password);
            return result;
        } catch(error) {
        if (error instanceof Error) {
            setError(error.message);
        } else if (typeof error === 'string') {
            setError(error);
        } else {
            setError("不明なエラーが発生しました");
        }
        throw error;            
        }
    };

    //ログイン
    const signin = async (email:string, password:string) => {
        try {
        setError(null); 
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
        } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else if (typeof error === 'string') {
            setError(error);
        } else {
            setError("不明なエラーが発生しました");
        }
        throw error;
        }
    };

    //ログアウト
    const logout = async () => {
        try {
        setError(null);
        await signOut(auth);


        } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else if (typeof error === 'string') {
            setError(error);
        } else {
            setError("不明なエラーが発生しました");
        }
        throw error;
        }
    };


    //エラークリア関数
    const clearError = () => {
        setError(null);
    };

    const value = {
        currentUser,
        loading,
        error,
        signup,
        signin,
        logout,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    );
};