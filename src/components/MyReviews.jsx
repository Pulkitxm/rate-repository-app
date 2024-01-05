import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { useQuery } from '@apollo/client';
import { ME_REVIEWS } from '../graphql/queries';
import CustomLoader from './Loader';
import Review from './Review';

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const MyReviews = () => {
  const { data, loading } = useQuery(ME_REVIEWS)
  if (loading) {
    return <View style={styles.loaderContainer}>
      <CustomLoader text={"loading reviews..."} />
    </View>
  }
  if (data.me && data.me.reviews){
    const myReviews = data.me.reviews.edges.map(i=>i.node)
    return (
      <>
        {
          myReviews.map((i, index) => {
            return (
              <Review
                key={index}
                text={i.text}
                rating={i.rating}
                user={i.user.username}
                createdAt={i.createdAt}
                showActions={true}
                repoId={i.repository.id}
                id={i.id}
              />
            )
          })
        }
      </>
    )
  } else {
    return <Text>Please login to see this page </Text>
  }
}
export default MyReviews