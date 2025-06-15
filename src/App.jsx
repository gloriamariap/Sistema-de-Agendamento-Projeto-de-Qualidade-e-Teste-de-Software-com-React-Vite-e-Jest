import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointments, setAppointments] = useState([]);

  const addAppointment = () => {
    if (!title || !date || !time) {
      alert('Preencha todos os campos!');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      title,
      date,
      time,
    };

    setAppointments([...appointments, newAppointment]);
    setTitle('');
    setDate('');
    setTime('');
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>📅 Agenda de Compromissos</h1>

      <div className="form">
        <label>Título:</label>
        <input
          type="text"
          placeholder="Título do compromisso"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Data:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          data-testid="input-data"
        />

        <label>Hora:</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          data-testid="input-hora"
        />

        <button onClick={addAppointment}>Adicionar</button>
      </div>

      <div className="list">
        {appointments.length === 0 && (
          <p className="empty">Nenhum compromisso adicionado.</p>
        )}
        {appointments.map((item) => (
          <div key={item.id} className="item">
            <div>
              <h3>{item.title}</h3>
              <p>📅 {item.date} ⏰ {item.time}</p>
            </div>
            <button className="delete" onClick={() => deleteAppointment(item.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


