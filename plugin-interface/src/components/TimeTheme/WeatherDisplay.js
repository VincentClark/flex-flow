import React from 'react';
import { withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';
const WeatherDisplay = ({ weather }) => {
    const tempDegrees = () => {
        return weather.location.country === 'United States of America' ? `${weather.current.temp_f}` : `${weather.current.temp_c}`;

    }

    return (
        <Container>
            <Header>{`${weather.current.condition.text} : ${tempDegrees()}°`}</Header>
            <Setter><img width='100' height='100' src={`http:${weather.current.condition.icon}`} /></Setter>
        </Container>
    )
};
// const WeatherContainer = styled("div")`
//     display: inline-block;
//     vertical-align: middle;
//     color: ${props => props.theme.SideNav.Container.background};
//     `;
const Container = styled("div")`
                color: ${props => props.theme.calculated.textColor};
                display: flex;
                flex-direction: row;
                flex-grow: 1;
                max-width: 100%;
                vertical-align: middle;
                align-items: center;
                `;

const Header = styled("div")`
                font-size: 16px;
                display: flex;
                flex-direction: row;
            `
const Setter = styled("div")
    `
                display: flex;

                `
export default withTheme(WeatherDisplay);
