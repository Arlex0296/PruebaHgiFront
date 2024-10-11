
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

