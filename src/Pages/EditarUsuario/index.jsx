import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditarUsuario = ({ open, handleClose, usuarioActual, handleActualizarUsuario }) => {
  const [usuario, setUsuario] = useState(usuarioActual);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setUsuario(usuarioActual); 
  }, [usuarioActual]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
    if (name === 'telefono' || name === 'edad' || name === 'document') {
      if (!/^\d*$/.test(value)) {
        return; 
      }
    }

    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = () => {
   
    for (const key in usuario) {
      if (!usuario[key]) {
        setError('Todos los campos son obligatorios.');
        setOpenSnackbar(true);
        return;
      }
    }

    
    if (usuario.name.length < 3) {
      setError('El nombre del usuario debe tener al menos 3 caracteres.');
      setOpenSnackbar(true);
      return;
    }

    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronEmail.test(usuario.email)) {
      setError('El email debe ser válido (contener un "@" y un "." en el dominio).');
      setOpenSnackbar(true);
      return;
    }

    if (usuario.telefono.length < 1) {
      setError('El teléfono no puede estar vacío.');
      setOpenSnackbar(true);
      return;
    }

    if (usuario.edad.length < 1) {
      setError('La edad no puede estar vacía.');
      setOpenSnackbar(true);
      return;
    }

    if (usuario.document.length < 1) {
      setError('El documento no puede estar vacío.');
      setOpenSnackbar(true);
      return;
    }

    handleActualizarUsuario(usuario);
    handleClose();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError('');
  };

  
  if (!usuario) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="name"
          value={usuario.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={usuario.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={usuario.telefono}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Edad"
          name="edad"
          value={usuario.edad}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dirección"
          name="direccion"
          value={usuario.direccion}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Documento"
          name="document"
          value={usuario.document}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Guardar Cambios</Button>
      </DialogActions>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EditarUsuario;
