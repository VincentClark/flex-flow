/* file: src/components/Quote/Quote.Styles.js */

import { default as styled } from 'react-emotion';

// main container
export const QuoteComponentStyled = styled('div')`
  align-items: center;
  display: flex;
  flex: 0 1 auto;
  flex-basis: auto;
  flex-direction: column;
  justify-content: center;
  vertical-align: baseline;
  padding: 0 5vw;
  max-width: 300px;
`;

// header holding the 'Quote of the Day' text
export const Header = styled('div')`
  font-size: 10px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0px 12px 4px;
`;

// accented line underneath the header
export const HeaderLine = styled('div')`
  border-style: solid;
  border-width: 0px 0px 4px;
  border-color: ${(props) => props.theme.colors.flexBlueColor};
`;

// body of the quote
export const QuoteBody = styled('div')`
  color: ${(props) => props.theme.colors.base8};
  text-align: center;
  padding-top: 20px;
`;

// author of the quote
export const QuoteAuthor = styled('div')`
  color: ${(props) => props.theme.colors.base10};
  padding-top: 10px;
  padding-bottom: 50px;
  font-weight: bold;
`;