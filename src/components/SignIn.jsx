import * as yup from 'yup';
import { Text, TextInput, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';
import { Alert } from 'react-native';
import useSignIn from '../hooks/useSignin';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

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
    const userNameError = usernameMeta.touched && usernameMeta.error;
    const passwordError = passwordMeta.touched && passwordMeta.error;
    const navigate = useNavigate()
    return (
        <View
            style={styles.signInContainer}
        >
            <TextInput
                placeholder="Username"
                testID='username'
                value={usernameField.value}
                onChangeText={text => usernameHelpers.setValue(text)}
                style={userNameError ? { ...styles.inputText, borderColor: "#d73a4a" } : { ...styles.inputText }}
            />
            {userNameError && <Text style={styles.errorText} >
                {usernameMeta.error}
            </Text>}
            <TextInput
                secureTextEntry={true}
                testID='password'
                placeholder="Password"
                value={passwordField.value}
                onChangeText={text => passwordHelpers.setValue(text)}
                style={passwordError ? { ...styles.inputText, borderColor: "#d73a4a" } : { ...styles.inputText }}
            />
            {passwordError && <Text style={styles.errorText} >
                {passwordMeta.error}
            </Text>}
            <Pressable onPress={onSubmit}   >
                <Text style={{ ...styles.buttonSubmit, backgroundColor: "green" }} testID='submit'>Sign-In</Text>
            </Pressable>
            <Text style={{ fontSize: 25, textAlign: "center" }} >or</Text>
            <Pressable onPress={() => {
                navigate("/signup")
            }} style={{}}    >
                <Text style={{ ...styles.buttonSubmit, backgroundColor: "red", color: "#000" }} testID='submit'>Sign-Up</Text>
            </Pressable>
        </View>
    );
};
export const SiginContainer = ({ onSubmit, initialValues }) => {
    return (
        <Formik
            key={JSON.stringify(initialValues)} // Re-render when initialValues change
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SingInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignIn = () => {
    const { signIn, error } = useSignIn();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({ username: '', password: '' });
    const params = useParams();

    useEffect(() => {
        if (params.username && params.password &&
            (params.username !== initialValues.username || params.password !== initialValues.password)) {
            setInitialValues({
                username: params.username,
                password: params.password,
            });
        }
    }, [params]);

    const onSubmit = async (values) => {
        const { username, password } = values;
        if (username !== "" && password !== "") {
            try {
                const res = await signIn(username, password);
                navigate("/");
            } catch (err) {
                Alert.alert(err.message);
            }
        } else {
            Alert.alert("Please enter username and password to sign in");
        }
    };

    return (
        <SiginContainer onSubmit={onSubmit} initialValues={initialValues} />
    );
};

export default SignIn;