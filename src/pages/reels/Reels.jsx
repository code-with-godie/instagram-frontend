import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Sidenav from '../../components/nav/Sidenav';
import VideoContainer from '../../components/reels/VideoContainer';
import BottomNav from '../../components/nav/BottomNav';
import { posts } from '../../data/data';
import { useFetch } from '../../api/useFetch';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import Toast from '../../components/models/Toast';
import { useAppContext } from '../../context/AppContext';
const Container = styled.section`
    height: 100%;
    overflow: auto;
    display: flex;
`;
const Left = styled.article`
    border-right: 1px solid #dbdbdb;
    padding: 0.5rem;
    display: none;
    @media screen and (min-width: 768px) {
        display: flex;
    }
    @media screen and (min-width: 1300px) {
        flex: 1;
    }
`;
const Right = styled.article`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    flex: 4;
    align-items: center;
`;
const ReelsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    flex: 1;
    width: 100%;
    max-width: 450px;
    scroll-snap-type: y;
    ::-webkit-scrollbar {
        width: 0;
    }
`;
const Reels = () => {
    const { isPageHidden } = useAppContext();
    const { loading, data, error } = useFetch('/posts/reels');
    const [reels, setReels] = useState([]);
    const containerRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [observer, setObserver] = useState(false);
    const createObserver = () => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target?.paused && entry.target?.play();
                    } else {
                        !entry.target?.paused && entry.target?.pause();
                    }
                });
            },
            { threshold: 0.75 }
        );
        return observer;
    };

    useEffect(() => {
        const prev = document.title;
        document.title = 'Instagram. Reels';
        const observer = createObserver();
        setObserver(observer);
        return () => {
            document.title = prev;
        };
    }, []);
    useEffect(() => {
        data && setReels(data.posts);
    }, [data]);

    if (error) {
        setToastMessage(error.message);
        return null;
    }
    return (
        <Container>
            <Left>
                <Sidenav />
            </Left>
            <Right>
                <ReelsContainer ref={containerRef}>
                    {loading ? (
                        <LoadingAnimation large />
                    ) : (
                        reels.map(reel => (
                            <VideoContainer
                                observer={observer}
                                muted={muted}
                                setMuted={setMuted}
                                key={reel.id}
                                {...reel}
                            />
                        ))
                    )}
                </ReelsContainer>
                <BottomNav />
            </Right>
            {showToast && (
                <Toast
                    messege={toastMessage}
                    handleToast={setShowToast}
                />
            )}
        </Container>
    );
};

export default Reels;
