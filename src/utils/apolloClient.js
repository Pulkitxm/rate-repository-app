import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    // Replace the IP address part with your own IP address!
    uri: `http://${process.env.IP}:4000/graphql`,
});

const createApolloClient = () => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;