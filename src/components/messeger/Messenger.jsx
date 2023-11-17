import React, { useState } from 'react';
import styled from 'styled-components';
import ChatRooms from './ChatRooms';
import Conversations from './Conversations';
import ConversationPreview from './ConversationPreview';

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    height: 90%;
    border: 1px solid #dbdbdb;
    display: flex;
`;
const Left = styled.div`
    flex: 1;
    border-right: 1px solid #dbdbdb;
    padding: 0.5rem;
    display: ${props => (props.showRooms ? 'flex' : 'none')};
    @media screen and (min-width: 525px) {
        display: flex;
    }
`;
const Right = styled.div`
    display: ${props => (props.showRooms ? 'none' : 'flex')};
    flex: 2;
    @media screen and (min-width: 525px) {
        display: flex;
    }
`;
const Messenger = () => {
    const [currentConversation, setCurrentConversation] = useState(null);
    const [showRooms, setShowRooms] = useState(true);
    return (
        <Container>
            <Left showRooms={showRooms}>
                <ChatRooms
                    setShowRooms={setShowRooms}
                    changeConversation={setCurrentConversation}
                />
            </Left>
            <Right showRooms={showRooms}>
                {currentConversation ? (
                    <Conversations
                        setShowRooms={setShowRooms}
                        conversation={currentConversation}
                    />
                ) : (
                    <ConversationPreview />
                )}
            </Right>
        </Container>
    );
};

export default Messenger;
