import { useState, useEffect } from 'react';

export function Faq() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/faqs/')
      .then((res) => res.json())
      .then((dados) => setFaqs(dados))
      .catch((err) => console.error('Erro ao carregar FAQ:', err));
  }, []);

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ color: '#2e7d32' }}>Perguntas Frequentes (FAQ)</h2>
      {faqs.length === 0 ? (
        <p style={{ color: '#888' }}>Nenhuma pergunta cadastrada no momento.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          {faqs.map((item) => (
            <div
              key={item.id_faq || item.id}
              style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #c8e6c9',
              }}
            >
              <h4 style={{ color: '#1b5e20', margin: '0 0 8px 0' }}>{item.pergunta}</h4>
              <p style={{ margin: 0, color: '#444' }}>{item.resposta}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}