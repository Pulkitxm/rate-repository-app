import * as yup from 'yup';
import { Text, TextInput, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';
import { Alert } from 'react-native';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username should be greater than 1 character')
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'password must be greater than 8 charcaters')
        .required('Password is required'),
});

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
        borderWidth: 3,
        borderColor: "#00000099",
        padding: 10,
        borderRadius: 5,
        fontSize: 20,
    },
    buttonSubmit: {
        width: "95%",
        height: 50,
        margin: 10,
        padding: 11,
        borderRadius: 5,
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#0165d4",
        color: "#fff",
    },
    errorText: {
        color: "#d73a4a",
        marginLeft: "auto",
        width: "96%",
    }
}

const SingInForm = ({ onSubmit }) => {
    const [usernameField, usernameMeta, usernameHelpers] = useField('username');
    const [passwordField, passwordMeta, passwordHelpers] = useField('password');
    console.log(usernameMeta.error, passwordMeta.error);
    const userNameError = usernameMeta.touched && usernameMeta.error;
    const passwordError = passwordMeta.touched && passwordMeta.error;
    return (
        <View
            style={styles.signInContainer}
        >
            <TextInput
                placeholder="Username"
                value={usernameField.value}
                onChangeText={text => usernameHelpers.setValue(text)}
                style={userNameError ? { ...styles.inputText,borderColor:"#d73a4a" } : { ...styles.inputText }}
            />
            { userNameError &&<Text style={styles.errorText} >
                {usernameMeta.error}
            </Text>}
            <TextInput
                secureTextEntry={true}
                placeholder="Password"
                value={passwordField.value}
                onChangeText={text => passwordHelpers.setValue(text)}
                style={passwordError ? { ...styles.inputText, borderColor: "#d73a4a" } : { ...styles.inputText }}
            />
            {passwordError &&<Text style={styles.errorText} >
                {passwordMeta.error}
            </Text>}
            <Pressable onPress={onSubmit}>
                <Text style={styles.buttonSubmit}>Sign In</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = values => {
        const { username, password } = values;
        console.log(values);
        if (username != "" && password != "") {
            Alert.alert(`Username: ${username}, Password: ${password}`);
        } else {
            Alert.alert("Please enter username and password to sign in ")
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SingInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;