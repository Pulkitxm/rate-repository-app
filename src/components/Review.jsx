import { useApolloClient, useMutation } from '@apollo/client'
import { Text, View, StyleSheet, Platform, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { DELETE_REVIEW } from '../graphql/queries'

const styles = StyleSheet.create({
  reviewContainer: {
    width: "98%",
    display: "flex",
    padding: 15,
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      default: {
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 1)",
      }
    })
  },
  rating: {
    height: 50,
    width: 50,
    borderColor: "#2867ab",
    color: "#2867ab",
    borderWidth: 5,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rightDetails: {
    paddingLeft: 10
  },
  top: {
    marginTop: 5,
    marginBottom: 5,
  }
})

const Review = ({ text, rating, user, createdAt, showActions,repoId,id }) => {
  const navigate = useNavigate()
  const apolloClient = useApolloClient()

  const [deletReviewMutation, result] = useMutation(DELETE_REVIEW)

  const date = new Date(createdAt)
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}.${month}.${year}`;


  return (<View style={styles.reviewContainer} >
    <View style={{
      display: "flex",
      flexDirection: "row"
    }} >
      <View style={styles.rating} >
        <Text style={{ color: "#2867ab" }} >{rating}</Text>
      </View>
      <View style={styles.rightDetails}>
        <View style={styles.top}>
          <Text style={{ fontWeight: "900", fontSize: 18 }} >{user}</Text>
          <Text style={{ opacity: 0.7 }}>{formattedDate}</Text>
        </View>
        <Text style={{ width: 250}} >{text}</Text>
      </View>
    </View>
    {
      showActions &&
      <View style={{ marginTop: 10, display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
        <Pressable style={{
          height: 40,
          width: "45%",
          backgroundColor: "blue",
          display: "flex",
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:6
          }}
            onPress={() => {
              navigate(`/repo/${repoId}`)
          }}
          >
          <Text style={{color:"#fff"}} >View Repository</Text>
        </Pressable>
        <Pressable style={{
          height: 40,
          width: "45%",
          backgroundColor: "red",
          display: "flex",
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:6
          }}
            onPress={async() => {
              await deletReviewMutation({ variables: { deleteReviewId:id } })
              apolloClient.resetStore();
            }}
          >
          <Text style={{color:"#fff"}} >Delete Review</Text>
        </Pressable>
      </View>
    }
  </View>)
}
export default Review