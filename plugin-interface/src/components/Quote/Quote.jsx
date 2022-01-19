/* file: src/components/Quote/Quote.jsx */

import React, { Component } from 'react';
import { withTheme } from '@twilio/flex-ui';

// import simple styled components
import {
    QuoteComponentStyled, HeaderLine, Header, QuoteBody, QuoteAuthor
} from './Quote.Styles';

// quotable API URL to retrieve quotes from
const url = `https://api.quotable.io/random?tags=life`;

// the main component
class QuoteComponent extends Component {

    // initialize state variables
    constructor(props) {
        super(props);
        this.state = {
            quote: null,    // quote body
            author: null,   // quote author
            loaded: false,  // has loading finished?
            error: null     // did error occur?
        };
    }

    componentDidMount() {
        // once component is mounted, retrieve random quote from the API...
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                // ...and store it in component's state
                this.setState({
                    quote: json.content,
                    author: json.author,
                    loaded: true
                });
            })
            // if error occured, save its description
            .catch((error) => this.setState({ error, loaded: true }));
    }

    render() {
        // pull variables from state
        const { quote, author, error, loaded } = this.state;
        let value = quote;

        // display error or loading message if needed
        if (error) {
            console.error(error);
            value = `Error: ${error}`;
        }
        if (!loaded) {
            value = 'Loading...';
        }

        // and finally render quote using the styled components
        return (
            <QuoteComponentStyled>
                <HeaderLine>
                    <Header>Quote of the Day</Header>
                </HeaderLine>
                <QuoteBody>{value}</QuoteBody>
                <QuoteAuthor>{author ? author : ''}</QuoteAuthor>
            </QuoteComponentStyled>
        );
    }
}
export default withTheme(QuoteComponent);