import styled from 'styled-components'

export const PageContainer = styled.div`
  border: 1px solid red;
  width: 100%;
  overflow: hidden;
`;
export const ColumnContainer = styled.div`
  width: 100%;
  border: 1px dashed red;
  height: 200px;
`;
export const SectionGroup = styled.div`
  //border: 1px solid red;
  display: flex;
  /* justify-content: space-around; */
`;
export const Mid = styled.div`
  //border: 1px solid yellow;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const Left = styled.div`
  border: 0.5px groove gray;

  display: flex;
  flex-direction: column;
  width: 20%;
`;
export const Right = styled.div`
  border: 0.5px groove gray;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 70%;
`;
export const RightTop = styled.div`
  //border: 1px solid blue;
  display: flex;
  overflow: auto;
`;
export const RightBottom = styled.div`
  //border: 1px solid blue;
  display: flex;
  overflow: auto;
`;

export const Left2 = styled.div`
  //border: 1px solid blue;
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const Right2 = styled.div`
  //border: 1px solid blue;
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const RightTop2 = styled.div`
  //border: 1px solid blue;
  display: flex;
  overflow: auto;
`;
export const RightBottom2 = styled.div`
  //border: 1px solid blue;
  display: flex;
  overflow: auto;
`;