import React from 'react'
import styled from 'styled-components';
import logoOne from '../../assets/logoOne.png';
import { Search }  from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom'
const Container = styled.nav`
display: flex;
align-items: center;
gap:.5rem;
padding:.5rem;
border-bottom: 1px solid ${props => props.theme.border};
width: 100%;
.fav{
    transition: all 200ms;
    font-size: 1.7rem;
    color:${props => props.theme.border};
}
.fav:hover{
    transform: scale(1.1);
}
`
const LogoContainer = styled.div`
flex: 1;
`
const InputContainer = styled.div`
display: flex;
align-items: center;
padding: 0.5rem;
border-radius:.5rem;
background-color:${props => props.theme.border};
width: 100%;
max-width: 250px;
.icon{
    color:${props => props.theme.primary_3};
}
`
const Logo = styled.img`
max-width: 100px;
`
const Input = styled.input`
flex: 1;
font-family: 'Poppins',sans-serif;
background: transparent;
border: none;
outline: none;
::placeholder{
    color: ${props => props.theme.primary_3};
}

`
const Topnav = () => {
  return (
    <Container className='topnav' >
        <LogoContainer>
            <Link to='/' >
            <Logo src={logoOne}/>
            </Link>
        </LogoContainer>
        <InputContainer>
        <Search  className='icon'/>
        <Input placeholder='Search...' />
        </InputContainer>
            <FavoriteBorderIcon className='fav' />
    </Container>
  )
}

export default Topnav