// Map.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import mockMapboxGl from 'jest-mock';

// Mock mapbox-gl
jest.mock('mapbox-gl', () => mockMapboxGl);

describe('Map Component', () => {
  test('renders map container and monuments drawer', () => {
    const coordinates = [
      { latitude: 48.8566, longitude: 2.3522 },
      // Add more coordinates as needed
    ];

    const selectedMonumentsData = [
      // Add sample monument data as needed
    ];

    render(<Map />, {
      initialState: {
        location: {
          state: {
            coordinates,
            selectedMonumentsData,
          },
        },
      },
    });

    // Check if map container is rendered
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();

    // Check if monuments drawer is rendered
    const monumentsDrawer = screen.getByTestId('monuments-drawer');
    expect(monumentsDrawer).toBeInTheDocument();
  });
});
