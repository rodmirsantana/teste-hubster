import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 0 20px;

  p {
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    margin: 10px 10px;
    cursor: pointer;
  }

  p:hover {
    color: #333;
    opacity: 0.4;
  }
`;
