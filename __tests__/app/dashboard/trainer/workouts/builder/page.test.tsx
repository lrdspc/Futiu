
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
