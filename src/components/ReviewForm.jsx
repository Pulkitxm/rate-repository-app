import { Text, TextInput, Pressable, View, StyleSheet, Alert } from 'react-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import useRepositories from '../hooks/useRepositories'
import useReview from '../hooks/useReview'
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Github username is required'),
  repoName: yup.string().required('Github repository name is required'),
  rating: yup.number().min(1, 'Minimum rating is 1').max(100, 'Maximum rating is 100').required('Rating is required'),
  review: yup.string()
});

const initialValues = {
  // ownerName: "",
  // repoName: "",
  // rating: "",
  // review: "",
  ownerName: "jaredpalmer",
  repoName: "formik",
  rating: "10",
  review: "good",
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "50%",
    display: "flex",
  },
  inputText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "95%",
    height: 50,
    margin: 10,
    borderWidth: 3,
    borderColor: "#00000099",
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    textAlignVertical: "top",
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
})

const ReviewFormContainer = ({ onSubmit }) => {
  const [ownerNameField, ownerNameMeta, ownerNameHelpers] = useField('ownerName');
  const [repoNameField, repoNameMeta, repoNameHelpers] = useField('repoName');
  const [ratingField, ratingMeta, ratingHelpers] = useField('rating');
  const [reviewField, reviewMeta, reviewHelpers] = useField('review');

  const ownerNameError = ownerNameMeta.touched && ownerNameMeta.error;
  const repoNameError = repoNameMeta.touched && repoNameMeta.error;
  const ratingError = ratingMeta.touched && ratingMeta.error;
  const reviewError = reviewMeta.touched && reviewMeta.error;

  return (
    <View>
      <TextInput
        placeholder="Repository owner name"
        value={ownerNameField.value}
        onChangeText={text => ownerNameHelpers.setValue(text)} // Fixed typo here
        style={ownerNameError ? { ...styles.inputText, borderColor: "#d73a4a" } : { ...styles.inputText }}
      />
      {ownerNameError && (
        <Text style={styles.errorText}>{ownerNameMeta.error}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={repoNameField.value}
        onChangeText={text => repoNameHelpers.setValue(text)}
        style={repoNameError ? { ...styles.inputText, borderColor: "#d73a4a" } : { ...styles.inputText }}
      />
      {repoNameError && (
        <Text style={styles.errorText}>{repoNameMeta.error}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={ratingField.value}
        onChangeText={text => ratingHelpers.setValue(text)}
        style={ratingError ? { ...styles.inputText, borderColor: "#d73a4a" } : { ...styles.inputText }}
      />
      {ratingError && (
        <Text style={styles.errorText}>{ratingMeta.error}</Text>
      )}
      <TextInput
        placeholder="Review"
        value={reviewField.value}
        onChangeText={text => reviewHelpers.setValue(text)}
        style={{ ...styles.inputText, height: 200 }}
        multiline={true}
      />
      {reviewError && (
        <Text style={styles.errorText}>{reviewMeta.error}</Text>
      )}
      <Pressable onPress={onSubmit}>
        <Text style={styles.buttonSubmit}>Submit</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const { repositories, loading } = useRepositories()
  const { addReview } = useReview()
  const navigate = useNavigate()
  const onSubmit = values => {
    const { ownerName, rating, repoName, review } = values
    if (!loading) {
      const cond1 = repositories.filter(i => {
        if (i.ownerName == ownerName) {
          return i.name == repoName
        }
        return false;
      }).length >= 1; //if the repo belongs to the author
      const cond2 = repositories.filter(i => i.name == repoName).length >= 1; //if the repo actually exists
      if (cond1 && cond2) {
        try {
          addReview(review, repoName, rating, ownerName);
          const repo = repositories.filter(i => i.name == repoName && i.ownerName == ownerName)[0];
          navigate(`/repo/${repo.id}`)
        } catch (err) {
          Alert.alert(err.message)
        }
      } else {
        Alert.alert("invalid repository name or owner name");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
      {({ handleSubmit }) => <ReviewFormContainer onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm