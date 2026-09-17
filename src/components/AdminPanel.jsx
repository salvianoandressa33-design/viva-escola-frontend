import { useState, useEffect } from 'react';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('conteudos');
  
  // Estados para dados recebidos da API
  const [conteudos, setConteudos] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [canais, setCanais] = useState([]);
  const [relatos, setRelatos] = useState([]);

  // Estados dos Formulários
  const [novoConteudo, setNovoConteudo] = useState({ titulo: '', autor: '', fonte: '', url: '' });
  const [novaFaq, setNovaFaq] = useState({ pergunta: '', resposta: '' });
  const [novoCanal, setNovoCanal] = useState({ nome: '', telefone: '', descricao: '' });

  // Token JWT para requisições autenticadas
  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  };

  // Carregar todos os dados
  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/conteudos/')
      .then((res) => res.json())
      .then((data) => setConteudos(data));

    fetch('http://127.0.0.1:8000/api/faqs/')
      .then((res) => res.json())
      .then((data) => setFaqs(data));

    fetch('http://127.0.0.1:8000/api/canais-apoio/')
      .then((res) => res.json())
      .then((data) => setCanais(data));

    fetch('http://127.0.0.1:8000/api/relatos-anonimos/', {
      headers: getAuthHeaders(),
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setRelatos(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handlers de Adição ---
  const handleAddConteudo = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/conteudos/', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(novoConteudo),
    }).then((res) => {
      if (res.ok) {
        setNovoConteudo({ titulo: '', autor: '', fonte: '', url: '' });
        fetchData();
      }
    });
  };

  const handleAddFaq = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/faqs/', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(novaFaq),
    }).then((res) => {
      if (res.ok) {
        setNovaFaq({ pergunta: '', resposta: '' });
        fetchData();
      }
    });
  };

  const handleAddCanal = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/canais-apoio/', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(novoCanal),
    }).then((res) => {
      if (res.ok) {
        setNovoCanal({ nome: '', telefone: '', descricao: '' });
        fetchData();
      }
    });
  };

  // --- Handlers de Exclusão ---
  const handleDelete = (endpoint, id) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;

    fetch(`http://127.0.0.1:8000/api/${endpoint}/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then((res) => {
      if (res.ok) fetchData();
    });
  };

  return (
    <div className="card" style={{ marginBottom: '40px', borderColor: '#2e7d32' }}>
      <h2 className="section-title" style={{ marginTop: 0 }}>
        ⚙️ Central de Administração do Gestor
      </h2>

      {/* Menu de Abas da Administração */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('conteudos')}
          className={activeTab === 'conteudos' ? 'btn-primary' : 'btn-secondary'}
        >
          Gerenciar Conteúdos
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={activeTab === 'faqs' ? 'btn-primary' : 'btn-secondary'}
        >
          Gerenciar FAQ
        </button>
        <button
          onClick={() => setActiveTab('canais')}
          className={activeTab === 'canais' ? 'btn-primary' : 'btn-secondary'}
        >
          Gerenciar Canais
        </button>
        <button
          onClick={() => setActiveTab('relatos')}
          className={activeTab === 'relatos' ? 'btn-primary' : 'btn-secondary'}
        >
          Relatos Anônimos ({relatos.length})
        </button>
      </div>

      {/* ABA 1: CONTEÚDOS */}
      {activeTab === 'conteudos' && (
        <div>
          <form onSubmit={handleAddConteudo} style={{ marginBottom: '20px', display: 'grid', gap: '10px' }}>
            <h4>Adicionar Novo Conteúdo Informativo</h4>
            <input
              type="text"
              placeholder="Título"
              className="admin-input"
              value={novoConteudo.titulo}
              onChange={(e) => setNovoConteudo({ ...novoConteudo, titulo: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Autor"
              className="admin-input"
              value={novoConteudo.autor}
              onChange={(e) => setNovoConteudo({ ...novoConteudo, autor: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Fonte"
              className="admin-input"
              value={novoConteudo.fonte}
              onChange={(e) => setNovoConteudo({ ...novoConteudo, fonte: e.target.value })}
            />
            <input
              type="url"
              placeholder="URL do Link (ex: https://...)"
              className="admin-input"
              value={novoConteudo.url}
              onChange={(e) => setNovoConteudo({ ...novoConteudo, url: e.target.value })}
            />
            <button type="submit" className="btn-primary" style={{ justifySelf: 'start' }}>
              + Cadastrar Conteúdo
            </button>
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {conteudos.map((item) => (
                <tr key={item.id_conteudo || item.id}>
                  <td>{item.titulo}</td>
                  <td>{item.autor}</td>
                  <td>
                    <button
                      onClick={() => handleDelete('conteudos', item.id_conteudo || item.id)}
                      className="btn-danger"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ABA 2: FAQ */}
      {activeTab === 'faqs' && (
        <div>
          <form onSubmit={handleAddFaq} style={{ marginBottom: '20px', display: 'grid', gap: '10px' }}>
            <h4>Adicionar Pergunta Frequente (FAQ)</h4>
            <input
              type="text"
              placeholder="Pergunta"
              className="admin-input"
              value={novaFaq.pergunta}
              onChange={(e) => setNovaFaq({ ...novaFaq, pergunta: e.target.value })}
              required
            />
            <textarea
              placeholder="Resposta"
              className="admin-input"
              rows={3}
              value={novaFaq.resposta}
              onChange={(e) => setNovaFaq({ ...novaFaq, resposta: e.target.value })}
              required
            />
            <button type="submit" className="btn-primary" style={{ justifySelf: 'start' }}>
              + Cadastrar FAQ
            </button>
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Pergunta</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((item) => (
                <tr key={item.id_faq || item.id}>
                  <td>{item.pergunta}</td>
                  <td>
                    <button
                      onClick={() => handleDelete('faqs', item.id_faq || item.id)}
                      className="btn-danger"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ABA 3: CANAIS DE APOIO */}
      {activeTab === 'canais' && (
        <div>
          <form onSubmit={handleAddCanal} style={{ marginBottom: '20px', display: 'grid', gap: '10px' }}>
            <h4>Adicionar Canal de Apoio</h4>
            <input
              type="text"
              placeholder="Nome do Canal"
              className="admin-input"
              value={novoCanal.nome}
              onChange={(e) => setNovoCanal({ ...novoCanal, nome: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Telefone / Contato"
              className="admin-input"
              value={novoCanal.telefone}
              onChange={(e) => setNovoCanal({ ...novoCanal, telefone: e.target.value })}
            />
            <textarea
              placeholder="Descrição ou Endereço"
              className="admin-input"
              rows={2}
              value={novoCanal.descricao}
              onChange={(e) => setNovoCanal({ ...novoCanal, descricao: e.target.value })}
            />
            <button type="submit" className="btn-primary" style={{ justifySelf: 'start' }}>
              + Cadastrar Canal
            </button>
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {canais.map((item) => (
                <tr key={item.id_canal || item.id}>
                  <td>{item.nome || item.nome_canal || item.titulo}</td>
                  <td>{item.telefone || item.contato || '-'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete('canais-apoio', item.id_canal || item.id)}
                      className="btn-danger"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ABA 4: RELATOS ANÔNIMOS */}
      {activeTab === 'relatos' && (
        <div>
          <h4>Relatos Anônimos Recebidos</h4>
          {relatos.length === 0 ? (
            <p style={{ color: '#666', marginTop: '10px' }}>Nenhum relato registrado até o momento.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px', marginTop: '15px' }}>
              {relatos.map((item) => (
                <div
                  key={item.id_relato || item.id}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8faf8',
                    borderLeft: '4px solid #e53e3e',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: '500' }}>"{item.mensagem}"</p>
                    <small style={{ color: '#718096' }}>
                      Enviado em: {item.dataPublicacao ? new Date(item.dataPublicacao).toLocaleDateString() : 'Data não informada'}
                    </small>
                  </div>
                  <button
                    onClick={() => handleDelete('relatos-anonimos', item.id_relato || item.id)}
                    className="btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}