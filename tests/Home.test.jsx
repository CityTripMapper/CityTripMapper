import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../src/pages/Home'

describe('Home', () => {
    it('renders Home component', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText('SELECT MONUMENTS')).toBeInTheDocument();
    });

    it('should select a monument from the list', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const selectElement = screen.getByTestId('monument-select').querySelector('input');
        fireEvent.change(selectElement, { target: { value: 'Tour Eiffel' } });

        const selectedOption = screen.getByText('Tour Eiffel');
        expect(selectedOption).toBeInTheDocument();
    });
});