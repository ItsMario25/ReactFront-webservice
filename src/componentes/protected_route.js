import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const [isValid, setIsValid] = useState(null); // Inicialización correcta del estado
    const token = sessionStorage.getItem('authToken');
    const clientId = sessionStorage.getItem('client_id');
    const location = useLocation(); // Para manejar la redirección correctamente

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValid(false);
                return;
            }

            const data = { rol: requiredRole, client_id: clientId };
            try {
                const response = await fetch('http://localhost:8080/validar_token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Token inválido');
                } else {
                    setIsValid(true);
                }
            } catch (error) {
                setIsValid(false);
            }
        };

        validateToken();
    }, [token, clientId, requiredRole]);

    if (isValid === null) {
        return <div>Cargando...</div>; // Indicador de carga mientras se valida el token
    }

    if (!isValid) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;