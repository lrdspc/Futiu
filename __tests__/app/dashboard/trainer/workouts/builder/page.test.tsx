
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutBuilderPage from '@/app/dashboard/trainer/workouts/builder/page';

jest.mock('@/lib/exercises', () => ({
  exerciseDatabase: [
    { id: '1', name: 'Exercise 1', description: 'Description 1', category: 'Category 1', difficulty: 'Beginner', muscleGroups: ['Chest'], imageUrl: '' },
    { id: '2', name: 'Exercise 2', description: 'Description 2', category: 'Category 2', difficulty: 'Intermediate', muscleGroups: ['Back'], imageUrl: '' },
    { id: '3', name: 'Exercise 3', description: 'Description 3', category: 'Category 3', difficulty: 'Advanced', muscleGroups: ['Legs'], imageUrl: '' },
  ],
}));

describe('WorkoutBuilderPage', () => {
  it('should render the initial state correctly', () => {
    render(<WorkoutBuilderPage />);
    expect(screen.getByText('Criar Novo Treino')).toBeInTheDocument();
    expect(screen.getByText('Nenhum exercício adicionado')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Exercício')).toBeInTheDocument();
  });

  it('should add an exercise to the workout', () => {
    render(<WorkoutBuilderPage />);

    fireEvent.click(screen.getByText('Adicionar Exercício'));

    expect(screen.getByText('Selecionar Exercício')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Exercise 1'));

    expect(screen.queryByText('Nenhum exercício adicionado')).not.toBeInTheDocument();
    expect(screen.getByText('Exercise 1')).toBeInTheDocument();
    expect(screen.getByTestId('exercise-order')).toHaveTextContent('1');
  });

  it('should filter exercises based on search query', () => {
    render(<WorkoutBuilderPage />);

    fireEvent.click(screen.getByText('Adicionar Exercício'));

    const searchInput = screen.getByPlaceholderText('Buscar exercícios...');
    fireEvent.change(searchInput, { target: { value: 'Exercise 2' } });

    expect(screen.getByText('Exercise 2')).toBeInTheDocument();
    expect(screen.queryByText('Exercise 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Exercise 3')).not.toBeInTheDocument();
  });

  it('should update the details of an exercise', () => {
    render(<WorkoutBuilderPage />);

    fireEvent.click(screen.getByText('Adicionar Exercício'));
    fireEvent.click(screen.getByText('Exercise 1'));

    const setsInput = screen.getByLabelText('Séries');
    const repsInput = screen.getByLabelText('Repetições');
    const restInput = screen.getByLabelText('Descanso');

    fireEvent.change(setsInput, { target: { value: '4' } });
    fireEvent.change(repsInput, { target: { value: '8-10' } });
    fireEvent.change(restInput, { target: { value: '90s' } });

    expect(setsInput).toHaveValue(4);
    expect(repsInput).toHaveValue('8-10');
    expect(restInput).toHaveValue('90s');
  });

  it('should update workout information', () => {
    render(<WorkoutBuilderPage />);

    const nameInput = screen.getByLabelText('Nome do Treino');
    const categorySelect = screen.getByRole('combobox', { name: /categoria/i });
    const descriptionTextarea = screen.getByLabelText('Descrição');

    fireEvent.change(nameInput, { target: { value: 'My Awesome Workout' } });
    fireEvent.click(categorySelect);
    fireEvent.click(screen.getByText('Hipertrofia'));
    fireEvent.change(descriptionTextarea, { target: { value: 'This is a great workout.' } });

    expect(nameInput).toHaveValue('My Awesome Workout');
    expect(screen.getByText('Hipertrofia')).toBeInTheDocument();
    expect(descriptionTextarea).toHaveValue('This is a great workout.');
  });

  it('should update the order of exercises when an exercise is removed', () => {
    render(<WorkoutBuilderPage />);


    fireEvent.click(screen.getByText('Adicionar Exercício'));
    fireEvent.click(screen.getByText('Exercise 1'));

    fireEvent.click(screen.getByText('Adicionar Exercício'));
    fireEvent.click(screen.getByText('Exercise 2'));

    fireEvent.click(screen.getByText('Adicionar Exercício'));
    fireEvent.click(screen.getByText('Exercise 3'));


    const removeButtons = screen.getAllByTitle(/Remove exercise/i);
    fireEvent.click(removeButtons[1]);


    const remainingExercises = screen.getAllByText(/Exercise/);
    expect(remainingExercises).toHaveLength(2);
    expect(screen.getByText('Exercise 1')).toBeInTheDocument();
    expect(screen.getByText('Exercise 3')).toBeInTheDocument();

    const exerciseNumbers = screen.getAllByTestId('exercise-order');
    expect(exerciseNumbers[0]).toHaveTextContent('1');
    expect(exerciseNumbers[1]).toHaveTextContent('2');

  });
});
