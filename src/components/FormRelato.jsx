import { useState } from 'react';

export function FormRelato() {
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/relatos-anonimos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem }),
      });

      if (response.ok) {
        setStatus('Relato enviado anonimamente com sucesso!');
        setMensagem('');
      } else {
        setStatus('Erro ao enviar o relato. Tente novamente.');
      }
    } catch (error) {
      setStatus('Erro de conexão com o servidor.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Envie seu Relato Anônimo</h2>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>Sua identidade está totalmente protegida.</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '10px' }}
          placeholder="Escreva seu relato aqui..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Enviar Relato
        </button>
      </form>

      {status && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>}
    </div>
  );
}