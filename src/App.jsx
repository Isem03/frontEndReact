import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Calculadora from './calculadora';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logueado, setLogueado] = useState(false);
  const [name, setName] = useState('');
  const [emailRegistro, setEmailRegistro] = useState('');
  const [passwordRegistro, setPasswordRegistro] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState('');

  function ingresarUsuario(evento) {
    setEmail(evento.target.value);
  }

  function ingresarPassword(evento) {
    setPassword(evento.target.value);
  }

  function borrarId(evento){
    setId(evento.target.value);
  }

  function ingresar() {
    axios.post('http://localhost:10060/login', { email, password })
    .then(response => {
      alert('Sesión Iniciada');
      localStorage.setItem('token', response.data.token); // Guarda el token
      setLogueado(true);
    })
    .catch(error => {
      console.error(error.response.data); // Muestra el error en la consola
      alert('Acceso no Permitido: ' + error.response.data); // Muestra el error
    });
  }

  function registrarUsuario(evento) {
    const { name, value } = evento.target;
    if (name === 'name') setName(value);
    if (name === 'emailRegistro') setEmailRegistro(value);
    if (name === 'passwordRegistro') setPasswordRegistro(value);
  }

  function registrar() {
    axios.post('http://localhost:10060/register', { name, email: emailRegistro, password: passwordRegistro })
      .then(response => {
        alert('Usuario registrado con éxito!');
        obtenerUsuarios();
      })
      .catch(error => {
        alert('Error al registrar usuario');
      });
  }

  function obtenerUsuarios() {
    axios.get('http://localhost:10060/users')
      .then(response => {
        setUsuarios(response.data); // Guardar los usuarios en el estado
      })
      .catch(error => {
        alert('Error al obtener usuarios');
      });
  }

  function borrarUsuarios() {
    if (!id) {
      alert('Por favor, ingresa un ID válido.');
      return;
    }
    axios.delete(`http://localhost:10060/delete/${id}`)
      .then(response => {
        alert(response.data); 
        obtenerUsuarios();
      })
      .catch(error => {
        alert(error.data);
      });
  }


  if (logueado) {
    return <Calculadora />;
  }

  return (
    <>
      <h1>Inicio de Sesión</h1>
      <input type='text' name='email' id='email' value={email} onChange={ingresarUsuario} placeholder='Email' />
      <br />
      <input type='password' name='password' id='password' value={password} onChange={ingresarPassword} placeholder='Contraseña' />
      <br />
      <button onClick={ingresar}>Ingresar</button>
      <br />
      <br />
      <h1>Registro de Usuario</h1>
      <input type='text' name='name' id='name' value={name} onChange={registrarUsuario} placeholder='Ingrese un nombre' />
      <br />
      <input type='text' name='emailRegistro' id='emailRegistro' value={emailRegistro} onChange={registrarUsuario} placeholder='Ingrese un email' />
      <br />
      <input type='password' name='passwordRegistro' id='passwordRegistro' value={passwordRegistro} onChange={registrarUsuario} placeholder='Ingrese una contraseña' />
      <br />
      <button onClick={registrar}>Registrar</button>
      <br />
      <br />
      <h1>Lista de Usuarios Registrados</h1>
      <br />
      <br />
      <button onClick={obtenerUsuarios}>Mostrar Usuarios</button>
      <br />
      <br />
      <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(usuario => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
      <br/>
      <br/>
      <input type='number' name='id' id='id' value={id} onChange={borrarId} placeholder='Escriba el Id del usuario a borrar'></input>
      <br></br>
      <button onClick={borrarUsuarios}>Borrar</button>
      <br/>
      <br/>
      
      
    </>
  );
}

export default App;
