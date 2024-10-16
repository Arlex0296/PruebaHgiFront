import React, { useEffect, useState } from 'react';
import { fetchData } from '../../Api/index';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Box, 
  Modal,
  TextField,
  Typography,
  Tooltip, 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CrearUsuario from '../../Componenetes/CrearUsuario/index'; 
import EditarUsuario from '../../Componenetes/EditarUsuario/index'; 
import { API_URL } from  '../../Utils/utils'

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [openCrear, setOpenCrear] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openDetalles, setOpenDetalles] = useState(false); 
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const handleOpenCrear = () => setOpenCrear(true);
  const handleCloseCrear = () => setOpenCrear(false);

  const handleOpenEditar = (usuario) => {
    setUsuarioActual(usuario);
    setOpenEditar(true);
  };
  const handleCloseEditar = () => setOpenEditar(false);

  const handleOpenDetalles = (usuario) => {
    setUsuarioActual(usuario);
    setOpenDetalles(true);
  };
  const handleCloseDetalles = () => setOpenDetalles(false);

  const handleCrearUsuario = async (nuevoUsuario) => {
    try {
      
      console.log('Enviando datos:', JSON.stringify(nuevoUsuario));
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });
   
      if (response.ok) { 
        const data = await response.json();  
        alert(data.message)
        
        handleCloseCrear();
        fetchUsuarios()
      } else if (response.status === 409) {
        const errorData = await response.json();

        alert(errorData.message || 'El documento ya está guardado.');
        fetchUsuarios()
      } else {
        const errorData = await response.json();
        
        
        throw new Error('Error al crear el usuario');
      }
    } catch (error) {
    
      alert('Ocurrió un error inesperado.');
    }
  };
  

  const handleActualizarUsuario = async (usuarioActualizado) => {
    try {
      const response = await fetch(`${API_URL}/${usuarioActualizado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioActualizado),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar el usuario: ${errorText}`);
      }

      const nuevosUsuarios = await fetchData();
      setUsuarios(nuevosUsuarios);
      handleCloseEditar();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar el usuario: ${errorText}`);
      }

      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const fetchUsuarios = async () => {
    setCargando(true);
    try {
      const data = await fetchData(); 
      setUsuarios(data);
    } catch (error) {
      setError('Error al obtener usuarios');
    } finally {
      setCargando(false);
    }
  };


  useEffect(() => {
   

    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField 
          label="Buscar por nombre" 
          variant="outlined" 
          size="small" 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
          sx={{ width: '30%' }} 
        />
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />} 
          onClick={handleOpenCrear}
          sx={{ marginLeft: 2 }} 
        >
          Crear Usuario
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <Tooltip title="Detalles" arrow>
                <TableCell>
                  <strong style={{ cursor: 'pointer' }}>Nombre</strong>
                </TableCell>
              </Tooltip>
              <TableCell><strong>Acciones</strong></TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {usuariosFiltrados.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell onClick={() => handleOpenDetalles(usuario)} style={{ cursor: 'pointer' }}>{usuario.name}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleOpenEditar(usuario)}
                    sx={{ marginRight: 1 }}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Modal
        open={openDetalles}
        onClose={handleCloseDetalles}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box 
          sx={{ 
            bgcolor: 'background.paper', 
            border: '2px solid #000', 
            boxShadow: 24, 
            padding: 4, 
            borderRadius: 2,
            maxWidth: 400,
            margin: 'auto',
            marginTop: '10%',
          }}
        >
          <Typography 
            variant="h6" 
            id="modal-title"
          >
            Detalles del Usuario
          </Typography>
          {usuarioActual && (
            <>
              <p><strong>ID:</strong> {usuarioActual.id}</p>
              <p><strong>Nombre:</strong> {usuarioActual.name}</p>
              <p><strong>Email:</strong> {usuarioActual.email}</p>
              <p><strong>Teléfono:</strong> {usuarioActual.telefono}</p>
              <p><strong>Edad:</strong> {usuarioActual.edad}</p>
              <p><strong>Dirección:</strong> {usuarioActual.direccion}</p>
              <p><strong>Documento:</strong> {usuarioActual.document}</p>
            </>
          )}
          <Button 
            onClick={handleCloseDetalles} 
            variant="contained" 
            color="primary"
            sx={{ marginTop: 2 }} 
          >
            Cerrar
          </Button>
        </Box>
      </Modal>

      
      <CrearUsuario 
        open={openCrear} 
        handleClose={handleCloseCrear} 
        handleCrearUsuario={handleCrearUsuario} 
      />

      
      <EditarUsuario 
        open={openEditar} 
        handleClose={handleCloseEditar} 
        usuarioActual={usuarioActual} 
        handleActualizarUsuario={handleActualizarUsuario} 
      />
    </div>
  );
};

export default Usuarios;
