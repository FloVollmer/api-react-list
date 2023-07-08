
import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import App from './App';
  
  const mockEntries = { entries: [ { 
    API: 'API1',
    Description: 'Description1',
    Link: 'Link1' 
  } ] };

describe('Render tests', () => {

  beforeEach(() => {
    // Mock the API response
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve(mockEntries)
    });
  });

  afterEach(() => {
    // Restore the original fetch implementation
    global.fetch.mockRestore();
  });

  test('renders title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Entries/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders App with entries', async () => {
    render(<App />);

    // Wait for the component to fetch and render the entries
    await waitFor(() => {
      expect(screen.getByText('API1')).toBeInTheDocument();
      expect(screen.getByText('Description1')).toBeInTheDocument();
      expect(screen.getByText('Link1')).toBeInTheDocument();
    });
    
  });

});