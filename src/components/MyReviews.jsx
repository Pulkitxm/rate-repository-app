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
  } else {
    const myReviews = data.me.reviews.edges.map(i=>i.node)
    console.log(myReviews[0]);
    return (
      <>
        {
          myReviews.map((i,index) => {
            return (
              <Review
                key={index}
                text={i.text}
                rating={i.rating}
                user={i.user.username}
                createdAt={i.createdAt}
              />
            )
          })
        }
      </>
    )
  }
}
export default MyReviews