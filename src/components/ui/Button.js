import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #fff;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    color: ${props => props.cls.txtColor};
    transition-duration: 0.4s;
    border: 1.5px solid ${props => props.cls.borderColor};
    border-radius: 10px;
    width: 120px;
    font-size: 12px;
    margin-right: 20px;
    margin-left: 20px;

    :hover {
        background-color: ${props => props.cls.hoverColor};
        color: ${props => props.cls.hoverTxtColor};
    }
`;

const Button = (props) => {
    let btnCls;
    switch (props.cls) {
        case 'add':
            btnCls = {
                hoverColor: '#4CAF50',
                borderColor: '#4CAF50',
                txtColor: '#000',
                hoverTxtColor: '#ddd'
            }
            break;
        case 'delete':
            btnCls = {
                hoverColor: '#f73838',
                borderColor: '#f73838',
                txtColor: '#000',
                hoverTxtColor: '#ddd'
            }
            break;
        default:
            btnCls = {
                hoverColor: '#ccc',
                borderColor: '#000',
                txtColor: '#000',
                hoverTxtColor: '#fff'
            }
    }
    
    return (
        <StyledButton 
            cls={btnCls}
            disabled={props.disabled}
            type={props.type ? props.type : 'button'}
            onClick={props.clicked}>{props.children}</StyledButton>
    )
};

export default Button;