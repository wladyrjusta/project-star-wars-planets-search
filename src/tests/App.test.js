import React from 'react';
import { render, screen } from '@testing-library/react';

import mockAPI from './helpers/mockAPI';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa funcionalidades e comportamentos da aplicação TrybeWars', () => {
  test('Verifica se logo, imputs e botôes do formuário de filtros são renderizados corretamente', () => {
    render(<App />);

    const logoElement = screen.getByRole('img', { name: 'logo star wars'});
    const inputFilterText = screen.getByLabelText('Filtro por texto');
    const selectColumnFilter = screen.getByTestId('column-filter');
    const selectOperator = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const filterBtn = screen.getByRole('button', { name: 'Filtrar'});
    const clearAllBtn = screen.getByRole('button', { name: 'Limpar todos os filtros'});

    expect(logoElement).toBeVisible();
    expect(inputFilterText).toBeVisible();
    expect(selectColumnFilter).toBeVisible();
    expect(selectOperator).toBeVisible();
    expect(inputValueFilter).toBeVisible();
    expect(filterBtn).toBeVisible();
    expect(clearAllBtn).toBeVisible();
  });
  test('Verifica se os elementos da tabela são renderizados corretamente', async () => {
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockAPI),
  });
  
  render(<App />);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://swapi.dev/api/planets");

    const tdElementsPlanetsRotationPeriod = await screen.findAllByText('23');
    const thElements = screen.getAllByRole('columnheader');

    expect(thElements).toHaveLength(13);
    expect(thElements[0].innerHTML).toBe('Name');
    expect(tdElementsPlanetsRotationPeriod).toHaveLength(3);
  });
  test('Verifica se os elementos da tabela são filtrados por texto corretamente', async () => {
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockAPI),
  });
  
  render(<App />);

  const inputFilterText = screen.getByLabelText('Filtro por texto');

  const Tatooine = await screen.findByText('Tatooine');
  const Alderaan = await screen.findByText('Alderaan');

  expect(inputFilterText).toHaveValue('');
  expect(Tatooine).toBeVisible();
  expect(Alderaan).toBeVisible();

  userEvent.type(inputFilterText, 'Alderaan');
  expect(inputFilterText).toHaveValue('Alderaan');
  expect(Tatooine).not.toBeVisible();
  expect(Alderaan).toBeVisible();
  userEvent.type(inputFilterText, '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');

  userEvent.type(inputFilterText, 'Tatooine');
  expect(inputFilterText).toHaveValue('Tatooine');
  expect(await screen.findByText('Tatooine')).toBeVisible();
  expect(screen.queryByText('Alderaan')).not.toBeInTheDocument();
  });

  test('Verifica se os elementos da tabela são filtrados numericamente, de forma simultânea e se os filtros são renderizados na tela', async () => {
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockAPI),
  });
  
  render(<App />);

  const selectColumnFilter = screen.getByTestId('column-filter');
  const selectOperator = screen.getByTestId('comparison-filter');
  const inputValueFilter = screen.getByTestId('value-filter');
  const filterBtn = screen.getByRole('button', { name: 'Filtrar'});
  const clearAllBtn = screen.getByRole('button', { name: 'Limpar todos os filtros'});

  userEvent.selectOptions(selectColumnFilter, 'rotation_period');
  userEvent.selectOptions(selectOperator, 'maior que');
  userEvent.type(inputValueFilter, '24');
  userEvent.click(filterBtn);

  const Alderaan = screen.queryByText('Alderaan');
  expect(await screen.findByText('Naboo')).toBeVisible();
  expect(await screen.findByText('Kamino')).toBeVisible();
  expect(Alderaan).not.toBeInTheDocument();

  const filters = screen.getAllByTestId('filter');
  expect(filters).toHaveLength(1);

  userEvent.selectOptions(selectColumnFilter, 'orbital_period');
  userEvent.selectOptions(selectOperator, 'menor que');
  userEvent.type(inputValueFilter, '400');
  userEvent.click(filterBtn);

  const Kamino = screen.queryByText('Kamino');
  expect(await screen.findByText('Naboo')).toBeVisible();
  expect(Kamino).not.toBeInTheDocument();
  const filters2 = screen.getAllByTestId('filter');
  expect(filters2).toHaveLength(2);

  const filterClearBtn = screen.getAllByTestId('filter-clear-btn');
  expect(filterClearBtn).toHaveLength(2);
  userEvent.click(filterClearBtn[0]);
  expect(screen.getAllByTestId('filter-clear-btn')).toHaveLength(1);
  expect(await screen.findByText('Alderaan')).toBeVisible();

  userEvent.click(filterClearBtn[0]);

  expect(await screen.findByText('Kamino')).toBeVisible();

  userEvent.selectOptions(selectColumnFilter, 'orbital_period');
  userEvent.selectOptions(selectOperator, 'maior que');
  userEvent.type(inputValueFilter, '400');
  userEvent.click(filterBtn);
  expect(screen.getAllByTestId('filter-clear-btn')).toHaveLength(1);
  expect(screen.queryByText('Alderaan')).not.toBeInTheDocument();
  expect(await screen.findByText('Kamino')).toBeVisible();

  userEvent.selectOptions(selectColumnFilter, 'surface_water');
  userEvent.selectOptions(selectOperator, 'menor que');
  userEvent.type(inputValueFilter, '100');
  userEvent.click(filterBtn);
  expect(screen.getAllByTestId('filter-clear-btn')).toHaveLength(2);
  expect(screen.getAllByTestId('filter')).toHaveLength(2);
  expect(screen.queryByText('Kamino')).not.toBeInTheDocument();

  expect(clearAllBtn).toBeInTheDocument();
  userEvent.click(clearAllBtn);

  expect(screen.queryAllByTestId('filter-clear-btn')).toHaveLength(0);
  expect(screen.queryAllByTestId('filter')).toHaveLength(0);
  expect(await screen.findByText('Kamino')).toBeVisible();
  expect(await screen.findByText('Alderaan')).toBeVisible();
  });
});

