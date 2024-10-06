import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/Header/Search';

describe('Source', () => {
    it('submits value when Enter key is pressed', async () => {
        const mockSubmitFunction = jest.fn();
        render(<Search onSearch={mockSubmitFunction} />);

        const inputElement = screen.getByRole('textbox');
        await userEvent.type(inputElement, 'test value{enter}');
        expect(mockSubmitFunction).toHaveBeenCalledWith('test value');
    });
    
    it('submits value when button is clicked', async () => {
        const mockSubmitFunction = jest.fn();
        render(<Search onSearch={mockSubmitFunction} />);

        const inputElement = screen.getByRole('textbox');
        const buttonElement = screen.getByRole('button');
        await userEvent.type(inputElement, 'test value');
        await userEvent.click(buttonElement);
        expect(mockSubmitFunction).toHaveBeenCalledWith('test value');
    });
});