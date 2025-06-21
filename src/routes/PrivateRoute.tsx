import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps ) => {
    const { currentUser, loading } = useAuth();

    if (loading) 
        return (
            <div>Loading...</div>
        );

    return (
            currentUser ? <>{children}</> : <Navigate to="/" />
    ); 
}
