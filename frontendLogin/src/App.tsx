import { Login } from './login';
import { loginUser } from './services/api';

function App() {
  const handleLoginAction = async (data: any) => {
    try {
      const result = await loginUser(data);
      alert("¡Login exitoso!");
      // Aquí guardarías el token en localStorage
      localStorage.setItem('token', result.token);
    } catch (err) {
      alert("Error al conectar con AWS");
    }
  };

  return (
    <div className="App">
      <h1>Bienvenido al Sistema</h1>
      <Login onLogin={handleLoginAction} />
    </div>
  );
}

export default App;