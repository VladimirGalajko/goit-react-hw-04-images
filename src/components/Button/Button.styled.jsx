import styled from 'styled-components';

export const Btn = styled.button`
  background-color: #3f51b5;
  margin: 0 auto;
  max-width: 100px;
  color: rgb(255, 255, 255);
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  transition: filter 0.3s ease;
  &:hover {
    filter: brightness(80%);
  }
  &:active {
    transform: scale(0.9);
  }
`;
