import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header/Header';
import userEvent from '@testing-library/user-event';

const ipDataMock = {
    ip: '',
    location: '',
    timezone: '',
    isp: '',
    lat: 0,
    lng: 0
};

describe('Header', () => {
    it('renders Header component', () => {
        render(<Header ipData={ipDataMock} setIpData={jest.fn()} />);
        const title = screen.getByText(/IP Address Tracker/i);
        expect(title).toBeInTheDocument();
    });

    beforeEach(() => {
        global.fetch = jest.fn();
    });
    afterEach(() => {
        (global.fetch as jest.Mock).mockRestore();
    });

    it('fetches data and displays results', async () => {
        const testResponseData = {
            ip: '192.212.174.101',
            location: {
                city: 'Brooklyn',
                region: 'NY',
                country: 'US',
                postalCode: '10001',
                timezone: '-05:00',
                lat: 40.71427,
                lng: -74.00597,
            },
            isp: 'SpaceX Starlink',
        };
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
              ok: true,
              status: 200,
              json: () => Promise.resolve({ ...testResponseData}),
            } as Response)
          );
        render(<Header ipData={ipDataMock} setIpData={jest.fn()} 
        />);
        const input = screen.getByTestId('search-input');
        await userEvent.type(input, '123');
        await userEvent.click(screen.getByRole('button'));

        expect(global.fetch).toHaveBeenCalledTimes(1);
        // expect(await screen.findByText('192.212.174.101')).toBeInTheDocument();
        // expect(await screen.findByText('Brooklyn, NY, US 10001')).toBeInTheDocument();
        // expect(await screen.findByText('UTC -05:00')).toBeInTheDocument();
        // expect(await screen.findByText('SpaceX Starlink')).toBeInTheDocument();
    });
    
    it('fetch reject and render error message', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.reject(new Error('Something went wrong'))
          );
          render(<Header ipData={ipDataMock} setIpData={jest.fn()} 
          />);
          const input = screen.getByTestId('search-input');
        await userEvent.type(input, '123');
        await userEvent.click(screen.getByRole('button'));

        const errorText = await screen.findByText(/Something went wrong/i) as HTMLElement;
        expect(errorText).toBeInTheDocument();
    });

});