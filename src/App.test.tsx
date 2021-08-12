import { fireEvent, render, screen } from '@testing-library/react';
import App from './App'

describe('Cell simulator', () => { 
  test('Render component', () => {
    render(<App />);
    const cellHeading = screen.getByText(/Cell simulator/i);
    const githubLink = screen.getByText(/github/i);
    expect(cellHeading).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  })

  test('Check buttons', () => {
    render(<App />);
    const RunBtn = screen.getByRole('button', {name: 'Run'})
    const newGenBtn = screen.getByRole('button', {name: 'New generation'})
    const ResetBtn = screen.getByRole('button', {name: 'Reset'})
    expect(RunBtn).toBeInTheDocument()
    expect(newGenBtn).toBeInTheDocument()
    expect(ResetBtn).toBeInTheDocument()
  });

  test('Check new generation', () => {
    const { container } = render(<App />);
    const newGenBtn = screen.getByRole('button', {name: 'New generation'})
    fireEvent.click(newGenBtn)
    const  cell = container.getElementsByClassName('cell')
    expect(cell.length).toBeGreaterThan(1)
  });

  test('Check run feature', () => {
    const { container } = render(<App />);
    const newGenBtn = screen.getByRole('button', {name: 'New generation'})
    fireEvent.click(newGenBtn)
    const  cellsLength = container.getElementsByClassName('cell').length
    expect(cellsLength).toBeGreaterThan(1)
    const RunBtn = screen.getByRole('button', {name: 'Run'})
    fireEvent.click(RunBtn)
    const  newCellsLength = container.getElementsByClassName('cell').length
    expect(cellsLength).toBeGreaterThan(newCellsLength)
  });
});
