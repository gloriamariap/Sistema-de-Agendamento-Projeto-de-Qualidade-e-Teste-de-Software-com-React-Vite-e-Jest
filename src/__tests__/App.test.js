import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import React from 'react';

describe('Testes Simples - Agenda de Compromissos', () => {

  test('1 - Verifica se os inputs estão sendo renderizados', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');

    expect(tituloInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
  });

  test('2 - Verifica se o botão "Adicionar" está na tela', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /adicionar/i });
    expect(button).toBeInTheDocument();
  });

  test('3 - Verifica se é possível digitar nos inputs', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');

    fireEvent.change(tituloInput, { target: { value: 'Reunião' } });
    fireEvent.change(dateInput, { target: { value: '2025-06-15' } });
    fireEvent.change(timeInput, { target: { value: '10:00' } });

    expect(tituloInput.value).toBe('Reunião');
    expect(dateInput.value).toBe('2025-06-15');
    expect(timeInput.value).toBe('10:00');
  });

  test('4 - Verifica se o botão "Adicionar" funciona e adiciona um compromisso', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');
    const button = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.change(tituloInput, { target: { value: 'Dentista' } });
    fireEvent.change(dateInput, { target: { value: '2025-06-20' } });
    fireEvent.change(timeInput, { target: { value: '14:00' } });

    fireEvent.click(button);

    const compromisso = screen.getByText(/dentista/i);
    expect(compromisso).toBeInTheDocument();
  });

  test('5 - Verifica se o botão "Excluir" remove o compromisso da lista', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');
    const addButton = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.change(tituloInput, { target: { value: 'Dentista' } });
    fireEvent.change(dateInput, { target: { value: '2025-06-20' } });
    fireEvent.change(timeInput, { target: { value: '14:00' } });

    fireEvent.click(addButton);

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(deleteButton);

    const mensagem = screen.getByText(/nenhum compromisso adicionado/i);
    expect(mensagem).toBeInTheDocument();
  });

  test('6 - Verifica se os campos são limpos após adicionar um compromisso', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');
    const addButton = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.change(tituloInput, { target: { value: 'Reunião' } });
    fireEvent.change(dateInput, { target: { value: '2025-06-25' } });
    fireEvent.change(timeInput, { target: { value: '09:00' } });

    fireEvent.click(addButton);

    expect(tituloInput.value).toBe('');
    expect(dateInput.value).toBe('');
    expect(timeInput.value).toBe('');
  });

  test('7 - Verifica se a mensagem "Nenhum compromisso adicionado" aparece inicialmente', () => {
    render(<App />);
    const mensagem = screen.getByText(/nenhum compromisso adicionado/i);
    expect(mensagem).toBeInTheDocument();
  });

  test('8 - Verifica se a mensagem "Nenhum compromisso adicionado" desaparece após adicionar um compromisso', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');
    const button = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.change(tituloInput, { target: { value: 'Médico' } });
    fireEvent.change(dateInput, { target: { value: '2025-06-22' } });
    fireEvent.change(timeInput, { target: { value: '15:30' } });

    fireEvent.click(button);

    const mensagem = screen.queryByText(/nenhum compromisso adicionado/i);
    expect(mensagem).toBeNull();
  });

  test('9 - Verifica se é possível adicionar dois compromissos e ambos aparecem na lista', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');
    const button = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.change(tituloInput, { target: { value: 'Reunião' } });
    fireEvent.change(dateInput, { target: { value: '2025-06-28' } });
    fireEvent.change(timeInput, { target: { value: '11:00' } });
    fireEvent.click(button);

    fireEvent.change(tituloInput, { target: { value: 'Dentista' } });
    fireEvent.change(dateInput, { target: { value: '2025-06-29' } });
    fireEvent.change(timeInput, { target: { value: '09:00' } });
    fireEvent.click(button);

    const compromisso1 = screen.getByText(/reunião/i);
    const compromisso2 = screen.getByText(/dentista/i);

    expect(compromisso1).toBeInTheDocument();
    expect(compromisso2).toBeInTheDocument();
  });

  test('10 - Verifica se não adiciona compromisso quando algum campo está vazio', () => {
    render(<App />);

    const tituloInput = screen.getByPlaceholderText(/título do compromisso/i);
    const dateInput = screen.getByTestId('input-data');
    const timeInput = screen.getByTestId('input-hora');
    const button = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.change(tituloInput, { target: { value: 'Compromisso inválido' } });

    fireEvent.click(button);

    const compromisso = screen.queryByText(/compromisso inválido/i);
    expect(compromisso).toBeNull();

    const mensagem = screen.getByText(/nenhum compromisso adicionado/i);
    expect(mensagem).toBeInTheDocument();
  });

});
