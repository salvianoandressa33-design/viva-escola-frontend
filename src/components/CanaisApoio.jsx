import { useState, useEffect } from 'react';

export function CanaisApoio() {
  const [canais, setCanais] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/canais-apoio/')
      .then((res) => res.json())
      .then((dados) => setCanais(dados))
      .catch((err) => console.error('Erro ao carregar canais de apoio:', err));
  }, []);

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ color: '#2e7d32' }}>Canais de Apoio e Ajuda</h2>
      {canais.length === 0 ? (
        <p style={{ color: '#888' }}>Nenhum canal de apoio cadastrado no momento.</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '15px' }}>
          {canais.map((canal) => (
            <div
              key={canal.id_canal || canal.id}
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #c8e6c9',
                minWidth: '250px',
                maxWidth: '300px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                textAlign: 'left'
              }}
            >
              <h3 style={{ color: '#1b5e20', marginTop: 0 }}>
                {canal.nome || canal.nome_canal || canal.titulo || 'Canal de Apoio'}
              </h3>
              {(canal.telefone || canal.contato) && (
                <p><strong>Telefone/Contato:</strong> {canal.telefone || canal.contato}</p>
              )}
              {(canal.descricao || canal.endereco) && (
                <p><strong>Info:</strong> {canal.descricao || canal.endereco}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}