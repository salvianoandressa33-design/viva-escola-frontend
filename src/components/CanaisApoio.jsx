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
    <section style={{ marginBottom: '40px' }}>
      <h2 className="section-title">Canais de Apoio e Ajuda</h2>
      {canais.length === 0 ? (
        <p style={{ color: '#718096' }}>Nenhum canal de apoio cadastrado.</p>
      ) : (
        <div className="grid-cards">
          {canais.map((canal) => (
            <div key={canal.id_canal || canal.id} className="card">
              <h3>{canal.nome || canal.nome_canal || canal.titulo || 'Canal de Apoio'}</h3>
              {(canal.telefone || canal.contato) && (
                <p style={{ fontSize: '0.9rem', marginBottom: '6px' }}>
                  <strong>Telefone/Contato:</strong> {canal.telefone || canal.contato}
                </p>
              )}
              {(canal.descricao || canal.endereco) && (
                <p style={{ fontSize: '0.9rem', color: '#555' }}>
                  {canal.descricao || canal.endereco}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}