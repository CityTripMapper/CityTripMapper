// Test

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../src/Home';
import { Map } from './Map';
import { describe, expect, it } from 'vitest';

describe('Map', () => {
    it('selects two monuments and submits, then shows the map with the itinerary', async () => {
        render(
            <MemoryRouter initialIndex={0} initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Map" element={<Map />} />
                </Routes>
            </MemoryRouter>
        );
      // Simulate selecting monuments
      const selectElement = screen.getByTestId('monument-select').querySelector('input');
      fireEvent.mouseDown(selectElement); // Opens the select dropdown

      await new Promise((resolve) => setTimeout(resolve, 500));

      let optionToSelect = await screen.findByText('Tour Eiffel');
      fireEvent.click(optionToSelect);
      
      await new Promise((resolve) => setTimeout(resolve, 500));

      optionToSelect = await screen.findByText('Musée du Louvre');
      fireEvent.click(optionToSelect);

      
      // Simulate clicking the submit button
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const mapElement = screen.getByTestId('map-element');
      expect(mapElement).toBeInTheDocument();

    });
});