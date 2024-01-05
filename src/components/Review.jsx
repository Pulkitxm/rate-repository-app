import { Text, View, StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  reviewContainer: {
    height: 250,
    width: "98%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
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

const Review = ({ text, rating, user, createdAt }) => {
  const date = new Date(createdAt)
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}.${month}.${year}`;
  return (<View style={styles.reviewContainer} >
    <View style={styles.rating} >
      <Text style={{ color: "#2867ab" }} >{rating}</Text>
    </View>
    <View style={styles.rightDetails}>
      <View style={styles.top}>
        <Text style={{ fontWeight: "900",fontSize:18 }} >{user}</Text>
        <Text style={{ opacity: 0.7 }}>{formattedDate}</Text>
      </View>
      <Text style={{width:"18%"}} >{text}</Text>
    </View>
  </View>)
}
export default Review