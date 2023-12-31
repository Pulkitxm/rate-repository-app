import { Text, TextInput, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';
import { Alert } from 'react-native';

const initialValues = {
    username: '',
    password: '',
};

const styles = {
    signInContainer: {
        width: "100%",
        height: "50%",
        display: "flex",
    },
    inputText: {
        width: "95%",
        height: 50,
        margin: 10,
        borderWidth:3,
        borderColor: "#00000099",
        padding: 10,
        borderRadius:5,
        fontSize:20,
    },
    buttonSubmit: {
        width: "95%",
        height: 50,
        margin: 10,
        padding: 11,
        borderRadius: 5,
        fontSize: 20,
        textAlign: "center",
        backgroundColor:"#0165d4",
        color: "#fff",
    }
}

const SingInForm = ({ onSubmit }) => {
    const [usernameField, usernameMeta, usernameHelpers] = useField('username');
    const [passwordField, passwordMeta, passwordHelpers] = useField('password');

    return (
        <View
            style={styles.signInContainer}
        >
            <TextInput
                placeholder="Username"
                value={usernameField.value}
                onChangeText={text => usernameHelpers.setValue(text)}
                style={styles.inputText}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Password"
                value={passwordField.value}
                onChangeText={text => passwordHelpers.setValue(text)}
                style={styles.inputText}
            />
            <Pressable onPress={onSubmit}>
                <Text style={styles.buttonSubmit}>Sign In</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = values => {
        const username = values.username;
        const password = values.password;
        if (username!="" && password!="") {
            Alert.alert(`Username: ${username}, Password: ${password}`);
        } else {
            Alert.alert("Please enter username and password to sign in ")
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <SingInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;