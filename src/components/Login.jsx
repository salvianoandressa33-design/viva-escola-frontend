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
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto 30px auto' }}>
      <h3 style={{ marginBottom: '15px' }}>Área de Gestão - Login</h3>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }}
            required
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Entrar</button>
      </form>
      {erro && <p style={{ color: '#e53e3e', marginTop: '10px', fontSize: '0.85rem' }}>{erro}</p>}
    </div>
  );
}