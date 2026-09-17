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
    <section style={{ marginBottom: '40px' }}>
      <h2 className="section-title">Perguntas Frequentes (FAQ)</h2>
      {faqs.length === 0 ? (
        <p style={{ color: '#718096' }}>Nenhuma pergunta cadastrada.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqs.map((item) => (
            <div key={item.id_faq || item.id} className="card">
              <h4 style={{ color: '#1b5e20', fontSize: '1.05rem', marginBottom: '8px' }}>
                {item.pergunta}
              </h4>
              <p style={{ margin: 0, color: '#4a5568', fontSize: '0.95rem' }}>{item.resposta}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}