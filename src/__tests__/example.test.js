import { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';

const Form = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onSubmit({ username, password });
    };

    return (
        <View>
            <View>
                <TextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Username"
                />
            </View>
            <View>
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                />
            </View>
            <View>
                <Pressable onPress={handleSubmit}>
                    <Text>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
};

describe('Form', () => {
    it('calls function provided by onSubmit prop after pressing the submit button', () => {
        const onSubmit = jest.fn();
        render(<Form onSubmit={onSubmit} />);

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Submit'));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        console.log(onSubmit.mock.calls);
        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
        });
    });
});