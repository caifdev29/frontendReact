import React, { useState } from 'react';

// 1. Definimos qué props acepta este componente
interface LoginProps {
  onLogin: (data: any) => Promise<void>;
}

// 2. Aplicamos la interfaz al componente

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos capturados:", { email, password });
    // Aquí llamaremos a la conexión más adelante
    onLogin({ email, password });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};