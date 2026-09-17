import { useState } from 'react';

export function FormRelato() {
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/relatos-anonimos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagem }),
    })
      .then((res) => {
        if (res.ok) {
          setSucesso(true);
          setMensagem('');
        }
      })
      .catch((err) => console.error('Erro ao enviar relato:', err));
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto 30px auto' }}>
      <h3 className="section-title" style={{ borderLeft: 'none', paddingLeft: 0, marginTop: 0 }}>
        Envie seu Relato Anônimo
      </h3>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
        Sua identidade está totalmente protegida.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Escreva seu relato aqui..."
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            resize: 'vertical',
            fontSize: '0.95rem',
            marginBottom: '15px',
          }}
          required
        />
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          Enviar Relato
        </button>
      </form>
      {sucesso && (
        <p style={{ color: '#2e7d32', marginTop: '12px', fontWeight: 'bold', textAlign: 'center' }}>
          ✓ Relato enviado anonimamente com sucesso!
        </p>
      )}
    </div>
  );
}