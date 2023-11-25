import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';


export const GlobalStyle = createGlobalStyle`
h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin: 0;
}
ul {
	margin: 0;
	padding: 0;
	list-style: none;
}

img {
	display: block;
	max-width: 100%;
	height: auto;
}

a {
text-decoration: none;
}

`;

export const Div = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding-bottom: 24px;	
`
