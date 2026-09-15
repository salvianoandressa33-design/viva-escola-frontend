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
    if (token) {
      setIsLoggedIn(true);
    }

    fetch('http://127.0.0.1:8000/api/conteudos/')
      .then((resposta) => resposta.json())
      .then((dados) => setConteudos(dados))
      .catch((erro) => console.error('Erro ao carregar os dados:', erro));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <div style={{ padding: '30px 20px', fontFamily: 'sans-serif', backgroundColor: '#f4f9f4', minHeight: '100vh', boxSizing: 'border-box' }}>
      {/* Cabeçalho */}
      <header style={{ marginBottom: '30px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          {isLoggedIn ? (
            <div>
              <span style={{ marginRight: '10px', color: '#1b5e20', fontWeight: 'bold' }}>👤 Gestor Autenticado</span>
              <button onClick={handleLogout} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px' }}>
                Sair
              </button>
            </div>
          ) : (
            <span style={{ fontSize: '0.9rem', color: '#666' }}>Acesso Público</span>
          )}
        </div>

        <h1 style={{ color: '#2e7d32', margin: '0 0 10px 0', fontSize: '2rem' }}>Viva Escola - Qualidade de Vida</h1>
        <p style={{ color: '#555', margin: 0 }}>Promovendo o bem-estar e a saúde na comunidade escolar.</p>
      </header>

      {/* Área de Autenticação */}
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px', border: '1px solid #a5d6a7', margin: '20px auto', maxWidth: '600px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#1b5e20' }}>Painel de Controle do Gestor</h3>
          <p style={{ margin: 0, color: '#2e7d32' }}>Você está logado e possui acesso total à gestão de conteúdos e relatos.</p>
        </div>
      )}

      {/* Módulos do Sistema */}
      <FormRelato />
      <CanaisApoio />
      <Faq />

      {/* Listagem de Conteúdos da API */}
      <section style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#2e7d32' }}>Conteúdos Informativos</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {conteudos.length === 0 ? (
            <p style={{ color: '#888' }}>Nenhum conteúdo cadastrado no momento.</p>
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
                  textAlign: 'left'
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
      </section>
    </div>
  );
}

export default App;