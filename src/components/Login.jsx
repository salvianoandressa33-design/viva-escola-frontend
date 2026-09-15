import { useState } from 'react';

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Salva o token de acesso no LocalStorage
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        onLoginSuccess();
      } else {
        setErro('Usuário ou senha incorretos.');
      }
    } catch (err) {
      setErro('Erro de conexão com o servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '350px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ccc' }}>
      <h3 style={{ color: '#2e7d32', marginTop: 0 }}>Área de Gestão - Login</h3>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {erro && <p style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>{erro}</p>}
    </div>
  );
}