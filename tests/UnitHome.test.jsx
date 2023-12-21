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

    it('should select a monument from the list', async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const selectElement = screen.getByTestId('monument-select').querySelector('input');
        fireEvent.mouseDown(selectElement); // Opens the select dropdown

        await new Promise((resolve) => setTimeout(resolve, 500));

        const optionToSelect = await screen.findByText('Tour Eiffel');
        fireEvent.click(optionToSelect);

        const selectedOption = screen.getAllByText('Tour Eiffel')[0];
        expect(selectedOption).toBeInTheDocument();
    });
});