import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CrearUsuario = ({ open, handleClose, handleCrearUsuario }) => {
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    telefono: '',
    edad: '',
    direccion: '',
    document: ''
  });

  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

    handleCrearUsuario(usuario);
    handleClose();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Usuario</DialogTitle>
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
        <Button onClick={handleSubmit} variant="contained" color="primary">Crear</Button>
      </DialogActions>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default CrearUsuario;
