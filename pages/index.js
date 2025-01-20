import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState({
    Assassino: true, Aprendiz: true, Silenciador: true, Paralisador: true, Paparazzi: true, Psicopata: true, Bruxo: true,
    Demônio: true, Joker: true, Farsante: true, "Homem Bomba": true, Diabo: true, Juiz: true, Policial: true, Anjo: true,
    Aldeão: true, Detetive: true, Fada: true, Espírito: true, Escudeiro: true, Justiceiro: true, Testemunha: true,
    Feirante: true, Advogado: true
  });
  const [playerNames, setPlayerNames] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [errors, setErrors] = useState([]);

  const sortRoles = (playerNames, availableRoles) => {
    const shuffledRoles = [...availableRoles].sort(() => Math.random() - 0.5);
    return playerNames.map((name, index) => ({ name, role: shuffledRoles[index] || 'Sem cargo' }));
  };
  
  const handleRoleToggle = (role) => {
    const updatedRoles = { ...roles, [role]: !roles[role] };
    setRoles(updatedRoles);
    const activeRoles = Object.values(updatedRoles).filter(Boolean).length;
    setPlayerNames(new Array(activeRoles).fill(''));
    setErrors(new Array(activeRoles).fill(false));
  };

  const handleNextStep = () => {
    const activeRoles = Object.values(roles).filter(Boolean).length;
    setPlayerNames(new Array(activeRoles).fill(''));
    setStep(2);
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);

    const updatedErrors = [...errors];
    updatedErrors[index] = !value.trim();
    setErrors(updatedErrors);
  };

  const handleSort = () => {
    const hasErrors = playerNames.some((name) => !name.trim());
    if (hasErrors) {
      setErrors(playerNames.map((name) => !name.trim()));
      return;
    }
    const availableRoles = Object.keys(roles).filter((role) => roles[role]);
    const sortedAssignments = sortRoles(playerNames, availableRoles);
    setAssignments(sortedAssignments);
    setStep(3);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <div style={{ width: '100%', maxWidth: '1200px', background: '#333', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        {step === 1 && (
          <div>
            <h2 style={{ textAlign: 'center', color: '#FFF' }}>Quais cargos serão sorteados?</h2>
            <p style={{ textAlign: 'center', color: '#FFF' }}>Total de jogadores: {Object.values(roles).filter(Boolean).length}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {Object.keys(roles).map((role) => (
                <div
                  key={role}
                  onClick={() => handleRoleToggle(role)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid',
                    borderColor: roles[role] ? 'green' : 'red',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: roles[role] ? '#d4f8d4' : '#f8d4d4',
                    transition: 'background-color 0.3s',
                  }}
                >
                  {role}
                </div>
              ))}
            </div>
            <button
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    width: '200px',
                    backgroundColor: '#770800',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: 'none',
                    borderRadius: '5px',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                }}
                onClick={handleNextStep}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#8a0d16'; 
                    e.target.style.transform = 'scale(1.05)'; 
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#770800';
                    e.target.style.transform = 'scale(1)';
                }}
                >
                Próximo
            </button>

          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#FFF' }}>Insira os nomes dos jogadores</h2>
            <div
              style={{
                display: 'grid',
                justifyContent: 'center',
                gridTemplateColumns: `repeat(${Math.min(3, Math.ceil(playerNames.length / 4)) || 1}, 1fr)`,
                gap: '25px',
              }}
            >
              {playerNames.map((name, index) => (
                <div key={index} style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                  <input
                    type="text"
                    placeholder={`Jogador ${index + 1}`}
                    value={name || ''}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    style={{
                      width: '300px',
                      maxWidth: '90%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: `1px solid ${errors[index] ? 'red' : '#ccc'}`,
                      textAlign: 'center',
                    }}
                  />
                  {errors[index] && (
                    <p style={{ color: 'red', fontSize: '12px', marginTop: '5px', display: 'column', textAlign: 'center' }}></p>
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                style={{
                  marginRight: '10px',
                  padding: '10px 20px',
                  marginBottom: '10px',
                  backgroundColor: '#770800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  marginBottom: '10px',
                  backgroundColor: '#770800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={handleSort}
              >
                Sortear
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#FFF' }}>Resultado</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {assignments.map(({ name, role }, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <h3 style={{ margin: '0 0 10px', color: '#333' }}>{name}</h3>
                  <p
                    style={{
                      margin: '0',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#555',
                    }}
                  >
                    {role}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                style={{
                  marginRight: '10px',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#FFF',
                  color: '#000',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF', e.currentTarget.style.backgroundColor = '#770800')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#000', e.currentTarget.style.backgroundColor = '#FFF')}
                onClick={() => setStep(2)}
              >
                Correção
              </button>
              <button
                style={{
                  marginRight: '10px',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#FFF',
                  color: '#000',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF', e.currentTarget.style.backgroundColor = '#770800')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#000', e.currentTarget.style.backgroundColor = '#FFF')}
                onClick={() => {
                  const availableRoles = Object.keys(roles).filter((role) => roles[role]);
                  const newAssignments = sortRoles(playerNames, availableRoles);
                  setAssignments(newAssignments);
                }}
              >
                Sortear
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: '#FFF',
                  color: '#000',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF', e.currentTarget.style.backgroundColor = '#770800')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#000', e.currentTarget.style.backgroundColor = '#FFF')}
                onClick={() => {
                  setRoles({
                    Assassino: true, Aprendiz: true, Silenciador: true, Paralisador: true, Paparazzi: true, Psicopata: true, Bruxo: true,
                    Demônio: true, Joker: true, Farsante: true, "Homem Bomba": true, Diabo: true, Juiz: true, Policial: true, Anjo: true,
                    Aldeão: true, Detetive: true, Fada: true, Espírito: true, Escudeiro: true, Justiceiro: true, Testemunha: true,
                    Feirante: true, Advogado: true
                  });
                  setPlayerNames([]);
                  setAssignments([]);
                  setErrors([]);
                  setStep(1);
                }}
              >
                Novo Sorteio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
