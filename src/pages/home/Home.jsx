import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Topnav from '../../components/nav/Topnav';
import Feeds from '../../components/home/Feeds';
import Sidenav from '../../components/nav/Sidenav';
import BottomNav from '../../components/nav/BottomNav';
import { useFetch } from '../../api/useFetch';
import AccountSwitch from '../../components/home/AccountSwitch';
import SuggestedAccounts from '../../components/home/SuggestedAccounts';
import Footer from '../../components/home/Footer';
import LoadingAnimation from '../../components/loading/LoadingAnimation';

const Container = styled.section`
    height: 100%;
    display: flex;
    @media screen and (min-width: 768px) {
        .topnav {
            display: none;
        }
    }
`;
const Left = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        display: flex;
        padding: 0.5rem;
        border-right: 1px solid #dbdbdb;
    }
    @media screen and (min-width: 1300px) {
        flex: 1;
    }
`;
const Center = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 0.5rem;
    align-items: center;
    *::-webkit-scrollbar-track {
        box-shadow: none;
    }
    *::-webkit-scrollbar-thumb {
        display: none;
    }
`;
const Right = styled.div`
    display: none;
    padding-right: 1.5rem;
    @media screen and (min-width: 1200px) {
        display: block;
        flex: 1.5;
    }
`;
const Home = () => {
    const { loading, data, error } = useFetch('/posts');
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        document.title = 'Instagram';
    }, []);
    useEffect(() => {
        data && setPosts(data.posts);
    }, [data]);
    return (
        <Container>
            <Left>
                <Sidenav handlePosts={setPosts} />
            </Left>
            <Center>
                <Topnav />
                {loading ? (
                    <LoadingAnimation />
                ) : error ? (
                    'error occured'
                ) : (
                    <Feeds posts={posts} />
                )}
                <BottomNav handlePosts={setPosts} />
            </Center>
            <Right>
                <AccountSwitch />
                <SuggestedAccounts />
                <Footer />
            </Right>
        </Container>
    );
};

export default Home;
