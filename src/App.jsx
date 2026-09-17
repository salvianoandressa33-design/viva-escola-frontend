import { useState, useEffect } from 'react';
import { FormRelato } from './components/FormRelato';
import { Faq } from './components/Faq';
import { CanaisApoio } from './components/CanaisApoio';
import { Login } from './components/Login';

function App() {
  const [conteudos, setConteudos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setIsLoggedIn(true);

    fetch('http://127.0.0.1:8000/api/conteudos/')
      .then((resposta) => resposta.json())
      .then((dados) => setConteudos(dados))
      .catch((erro) => console.error('Erro ao carregar dados:', erro));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      {/* Cabeçalho */}
      <header className="app-header">
        <div>
          <h1 className="app-title">Viva Escola - Qualidade de Vida</h1>
          <p className="app-subtitle">Promovendo o bem-estar e a saúde na comunidade escolar.</p>
        </div>
        <div>
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="badge-status">👤 Gestor Autenticado</span>
              <button onClick={handleLogout} className="btn-danger">Sair</button>
            </div>
          ) : (
            <span style={{ fontSize: '0.85rem', color: '#718096' }}>Acesso Público</span>
          )}
        </div>
      </header>

      {/* Login ou Painel */}
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div className="card" style={{ marginBottom: '30px', backgroundColor: '#e8f5e9', borderColor: '#a5d6a7' }}>
          <h3>Painel de Controle do Gestor</h3>
          <p style={{ color: '#2e7d32' }}>Acesso total para gestão de conteúdos e relatos recebidos.</p>
        </div>
      )}

      {/* Módulos */}
      <FormRelato />
      <CanaisApoio />
      <Faq />

      {/* Conteúdos */}
      <section style={{ marginTop: '40px' }}>
        <h2 className="section-title">Conteúdos Informativos</h2>
        <div className="grid-cards">
          {conteudos.length === 0 ? (
            <p style={{ color: '#718096' }}>Nenhum conteúdo disponível no momento.</p>
          ) : (
            conteudos.map((item) => (
              <div key={item.id_conteudo || item.id} className="card">
                <h3>{item.titulo}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '6px' }}><strong>Autor:</strong> {item.autor}</p>
                {item.fonte && <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Fonte:</strong> {item.fonte}</p>}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32', fontWeight: '600' }}>
                    Acessar Link →
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;