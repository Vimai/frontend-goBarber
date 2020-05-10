import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 16px;
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0px;
  padding: 0 16px;
  width: 100%;
  color: #213e38;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
