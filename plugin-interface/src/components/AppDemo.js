import React from 'react'
import { default as styled } from 'react-emotion';

const AppDemo = () => {
    const BoxStyled = styled('div')`
    color: ${(props) => props.color};
    border: 3px solid ${(props) => props.color};
    font-weight: bold;
    padding: 10px;
    display: inline-block;
  `;
    let Box = (props) => {
        return (
            <BoxStyled color={props.color}>This is a {props.color} box!</BoxStyled>
        );
    };
    return <Box color="red" />;
}


export default AppDemo
