import React from 'react';
import styled from 'styled-components';

const StyledUl = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #808080;
    font-size: 10px;
`;

const StyledLi = styled.li`
    background-color: ${props => props.active ? '#489bc7' : ''};
    float: left;
    border-right:1px solid #bbb;

    :last-child {
        border-right: none;
    }

    a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    a:hover {
        background-color: #489bc7;
        color: #4d59ad
    }
`;

const Navbar = () => {
    return (
        <StyledUl>
            <StyledLi active><a href="/">Home</a></StyledLi>
        </StyledUl>
    )
};

export default Navbar;