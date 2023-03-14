import styled from 'styled-components';
import { Row, Col } from 'antd'

export const StyledCol = styled(Col)`
  border: 1px solid black;
`;
export const StyledRow = styled(Row)`
  border: 1px solid black;
  height: 10vh;
  width: 100vw;
`;

export const StyledColLeft = styled(Col)`
  height: 100%;
  width: 20vw;
`;

export const StyledColMiddle = styled(Col)`
  height: 100%;
  width: 60vw;
`;

export const StyledColRight = styled(Col)`
  height: 100%;
  width: 20vw;
`;