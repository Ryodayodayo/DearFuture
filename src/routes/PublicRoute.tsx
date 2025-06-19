import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
    children : React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps ) => {
    const { currentUser, loading } = useAuth();

    if (loading) 
        return (
            <div>
                Loading...
            </div>
        );

    return currentUser ? <Navigate to="/diarypage" /> : <div>{children}</div>;
};
