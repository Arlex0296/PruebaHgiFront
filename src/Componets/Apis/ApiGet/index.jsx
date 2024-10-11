// src/components/Api.jsx
import React, { useEffect, useState } from 'react';

// Exporta fetchData para ser reutilizada en otros componentes
export const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:5129/api/usuarios');
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
};

const Api = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataEffect = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataEffect();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {data.map(item => (
                <div key={item.id}>{item.name}</div> 
            ))}
        </div>
    );
};

export default Api;
