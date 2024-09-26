import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const [isValid, setIsValid] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const token = sessionStorage.getItem('authToken');
    const clientId = sessionStorage.getItem('client_id');
    const location = useLocation();

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValid(false);
                return;
            }

            const data = { rol: requiredRole, client_id: clientId };
            try {
                const response = await fetch('https://localhost:8080/validar_token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();
                const userRoleFromServer = responseData.rol_user;

                if (!response.ok) {
                    setUserRole(userRoleFromServer);
                    throw new Error('Token inválido');
                } else {
                    setUserRole(userRoleFromServer);
                    setIsValid(userRoleFromServer === requiredRole);
                }
            } catch (error) {
                console.error(error);
                setIsValid(false);
            }
        };

        if (isValid === null) {
            validateToken();
        }
    }, [token, clientId, requiredRole, isValid]);

    if (isValid === null) {
        return <div>Cargando...</div>;
    }

    if (!token) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (!isValid){
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (userRole !== requiredRole) {
        switch (userRole) {
            case 'docente':
                return <Navigate to="/docente" state={{ from: location }} />;
            case 'estudiante':
                return <Navigate to="/estudiante" state={{ from: location }} />;
            case 'secretario_academico':
                return <Navigate to="/secretario_ac" state={{ from: location }} />;
            case 'secretario_tecnico':
                return <Navigate to="/secretario_tec" state={{ from: location }} />;
            case 'consejo_facultad':
                return <Navigate to="/consejo_fac" state={{ from: location }} />;
            default:
                return <Navigate to="/" state={{ from: location }} />;
        }
    }

    return children;
};

export default ProtectedRoute;
