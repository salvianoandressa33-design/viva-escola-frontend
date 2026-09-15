import { useState, useEffect } from 'react';
import { FormRelato } from './components/FormRelato';
import { Faq } from './components/Faq';
import { CanaisApoio } from './components/CanaisApoio';

function App() {
  const [conteudos, setConteudos] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/conteudos/')
      .then((resposta) => resposta.json())
      .then((dados) => setConteudos(dados))
      .catch((erro) => console.error('Erro ao carregar os dados:', erro));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f9f4', minHeight: '100vh' }}>
      <h1 style={{ color: '#2e7d32' }}>Viva Escola - Qualidade de Vida</h1>
      <p style={{ color: '#555' }}>Promovendo o bem-estar e a saúde na comunidade escolar.</p>

      {/* Formulário de Relato Anônimo */}
      <FormRelato />

      {/* Canais de Apoio */}
      <CanaisApoio />

      {/* Seção de FAQ */}
      <Faq />

      {/* Listagem de Conteúdos da API */}
      <h2 style={{ color: '#2e7d32', marginTop: '40px' }}>Conteúdos Informativos</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {conteudos.length === 0 ? (
          <p style={{ color: '#888' }}>Nenhum conteúdo cadastrado no momento. Cadastre pelo painel Admin!</p>
        ) : (
          conteudos.map((item) => (
            <div
              key={item.id_conteudo || item.id}
              style={{
                border: '1px solid #c8e6c9',
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                minWidth: '250px',
                maxWidth: '300px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <h3 style={{ color: '#1b5e20', marginTop: 0 }}>{item.titulo}</h3>
              <p><strong>Autor:</strong> {item.autor}</p>
              {item.fonte && <p><strong>Fonte:</strong> {item.fonte}</p>}
              {item.url && (
                <p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32' }}>
                    Acessar Link
                  </a>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;