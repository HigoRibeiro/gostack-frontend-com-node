import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function Repository({ repository, onClick }) {
  return (<li>
    {repository.title}

    <button onClick={() => onClick(repository.id)}>
      Remover
    </button>
  </li>)
}

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('/repositories', { 
      title: `#${String(Date.now()).slice(-4)} Desafio React`,
      url: "https://github.com/HigoRibeiro",
      techs: ['React JS', 'Node JS']
    })

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const findIndex = repositories.findIndex(repository => repository.id === id)

    if (findIndex > -1) {

      await api.delete(`/repositories/${id}`)

      const newRepositories = [...repositories];
      newRepositories.splice(findIndex, 1);
  
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <Repository key={repository.id} repository={repository} onClick={handleRemoveRepository}/>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
