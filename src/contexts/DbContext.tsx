import { createContext, useContext } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";

interface DbContextType {
    getCollection: (name: string) => Promise<any[]>;
    addDocument: (name: string, data: any) => Promise<void>;
    getDocument: (name: string, id: string) => Promise<any | null>;
    updateDocument: (name: string, id: string, data: any) => Promise<void>;
    deleteDocument: (name: string, id: string) => Promise<void>;
    setDocument: (name: string, id: string, data: any) => Promise<void>;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export const useDb = () => {
    const context = useContext(DbContext);
    if (!context) throw new Error("useDb must be used within a DbProvider");
    return context;
};

export const DbProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    // コレクション取得
    const getCollection = async (name: string) => {
        const snapshot = await getDocs(collection(db, name));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    // ドキュメント追加
    const addDocument = async (name: string, data: any) => {
        await addDoc(collection(db, name), data);
    };

    // ドキュメント設定（追加または更新）
    const setDocument = async (name: string, id: string, data: any) => {
        const docRef = doc(db, name, id);
        await setDoc(docRef, data);
    };

    // ドキュメント取得
    const getDocument = async (name: string, id: string) => {
        const docRef = doc(db, name, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    };

    // ドキュメント更新
    const updateDocument = async (name: string, id: string, data: any) => {
        const docRef = doc(db, name, id);
        await updateDoc(docRef, data);
    };

    // ドキュメント削除
    const deleteDocument = async (name: string, id: string) => {
        const docRef = doc(db, name, id);
        await deleteDoc(docRef);
    };


    const value = {
        getCollection,
        addDocument,
        getDocument,
        updateDocument,
        deleteDocument,
        setDocument
    };

    return (
        <DbContext.Provider value={value}>
            {children}
        </DbContext.Provider>
    );
};