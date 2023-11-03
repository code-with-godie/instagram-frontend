import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormInput from '../../components/utility/FormInput';
import LoadingAnimation from '../../components/loading/LoadingAnimation';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../api/apiCalls';
const Container = styled.form`
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Button = styled.button`
    padding: 0.7rem;
    border-radius: 0.5rem;
    background-color: #4cb5f9;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:disabled {
        background-color: #d0d0d0;
    }
`;
const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const disabled = !user.email || user.password.length < 8;
    const [loading, setLoading] = useState(false);
    const { login: signiIn, openToast } = useAppContext();
    const navigate = useNavigate();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    };
    const login = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await postData('/users/auth/login', user);
            if (res.success) {
                const { token, user } = res;
                signiIn({ token, user });

                navigate('/');
            }
        } catch (error) {
            const message =
                error?.response?.data?.message?.toLowerCase() ||
                'Something went wrong.Try again later.';
            openToast(message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const prev = document.title;
        document.title = 'Login';
        return () => {
            document.title = prev;
        };
    }, []);
    return (
        <Container onSubmit={e => login(e)}>
            <FormInput
                placeholder='Mobile number or email address'
                name='email'
                type='email'
                value={user.email}
                required={true}
                handlChange={handleChange}
            />
            <FormInput
                placeholder='password'
                name='password'
                type='password'
                value={user.password}
                required={true}
                handlChange={handleChange}
            />
            <Button disabled={disabled}>
                {loading ? <LoadingAnimation /> : 'sign in'}
            </Button>
        </Container>
    );
};

export default Login;
