import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;

    background: ${props => props.theme["gray-900"]};
    border: 0;
    border-radius: 6px;
    color: ${props => props.theme["gray-300"]};
    
    padding: 1rem;
    
    &::placeholder {
      color: ${props => props.theme["gray-500"]};
    }

    @media (max-width: 600px) {
      padding-right: 0.5rem;
    }
  }

  button {
    display: flex;
    align-items: center;
    
    background: transparent;
    border: 0;
    border: 1px solid ${props => props.theme["green-300"]};
    border-radius: 6px;
    cursor: pointer;
    
    gap: 0.75rem;
    padding: 1rem;
    
    color: ${props => props.theme["green-300"]};
    font-weight: bold;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &:not(:disabled):hover { 
      background: ${props => props.theme["green-500"]};
      border-color: ${props => props.theme["green-500"]};
      color: ${props => props.theme["white"]};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`;
