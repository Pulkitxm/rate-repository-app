import { View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import useRepositories from '../hooks/useRepositories';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const Main = () => {
    const { repositories,loading,refetch } = useRepositories();
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor:"#e1e4e8"}}>
            <AppBar />
            <Routes>
                <Route path="/signin" element={<RepositoryList repositories={repositories} loading={loading} refetch={refetch} />} />
                <Route path="/" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;