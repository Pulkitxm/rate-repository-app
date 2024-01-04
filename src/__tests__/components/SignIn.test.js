import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SiginContainer } from '../../components/SignIn';

describe('SignIn Form', () => {
    describe('RepositoryListContainer', () => {
        it('signin form works correctly', async () => {
            const signInMock = jest.fn();
            render(<SiginContainer onSubmit={signInMock} />);

            const username = screen.getByPlaceholderText("Username")
            const password = screen.getByPlaceholderText("Password")
            const submit = screen.getByText('Sign-In')

            expect(username).toBeDefined()
            expect(password).toBeDefined()
            expect(submit).toBeDefined()

            await act(async () => {
                fireEvent.changeText(username, 'kalle');
                fireEvent.changeText(password, 'password');
                fireEvent.press(submit);
            });

            setTimeout(() => {
                expect(signInMock).toHaveBeenCalledTimes(1);
                expect(signInMock.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            }, 100)
        });
    });
});
