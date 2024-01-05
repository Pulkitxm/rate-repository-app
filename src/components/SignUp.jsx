import * as yup from 'yup';
import { Text, TextInput, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';
import { Alert } from 'react-native';
import { useNavigate } from 'react-router-dom'
import useSignUp from '../hooks/useSignup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username should be greater than 1 character')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'password must be greater than 8 charcaters')
    .required('Password is required'),
  cpassword: yup
    .string()
    .min(8, 'both passwords must be greater than 8 charcaters')
    .required('Confirm Password is required'),
});

const initialValues = {
  username: '',
  password: '',
  cpassword: '',
};

const styles = {
  signUpContainer: {
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

const SingUpForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username');
  const [passwordField, passwordMeta, passwordHelpers] = useField('password');
  const [cpasswordField, cpasswordMeta, cpasswordHelpers] = useField('cpassword');
  const userNameError = usernameMeta.touched && usernameMeta.error;
  const passwordError = passwordMeta.touched && passwordMeta.error;
  const cpasswordError = cpasswordMeta.touched && cpasswordMeta.error;
  const navigate = useNavigate()
  return (
    <View
      style={styles.signUpContainer}
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
      <TextInput
        secureTextEntry={true}
        testID='confirm-password'
        placeholder="Confirm Password"
        value={cpasswordField.value}
        onChangeText={text => cpasswordHelpers.setValue(text)}
        style={passwordError ? { ...styles.inputText, borderColor: "#d73a4a" } : { ...styles.inputText }}
      />
      {cpasswordError && <Text style={styles.errorText} >
        {cpasswordMeta.error}
      </Text>}
      <Pressable onPress={onSubmit}   >
        <Text style={{ ...styles.buttonSubmit, backgroundColor: "green" }} testID='submit'>Sign-Up</Text>
      </Pressable>
      <Text style={{ fontSize: 25, textAlign: "center" }} >or</Text>
      <Pressable onPress={() => {
        navigate(`/signin`)
      }} style={{}}    >
        <Text style={{ ...styles.buttonSubmit, backgroundColor: "red", color: "#000" }} testID='submit'>Sign-In</Text>
      </Pressable>
    </View>
  );
};

export const SiginContainer = ({ onSubmit }) => {
  return <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SingUpForm onSubmit={handleSubmit} />}
  </Formik >
}

const SignUp = () => {
  const { signUp, error } = useSignUp()
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    const { username, password, cpassword } = values;
    if (username != "" && password != "" && cpassword != '') {
      if (!(password == cpassword)) {
        Alert.alert("Cross check you passwords")
        return;
      }
      try {
        const res = await signUp(username, password)
        navigate(`/signin/${username}/${password}`)
      } catch (err) {
        Alert.alert(err.message)
      }
    } else {
      Alert.alert("Please enter username and password to sign in ")
    }
  };

  return (
    <SiginContainer onSubmit={onSubmit} />
  );
};

export default SignUp;