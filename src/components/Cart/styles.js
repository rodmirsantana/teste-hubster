import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  footer {
    margin-top: 30px;
    display: flex;
    width: 100%;
    flex-direction: column;

    button {
      background: #fe844c;
      color: #000;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      margin-top: 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#fe844c')};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px;

  thead tr {
    text-align: left;
  }

  thead th {
    color: #999;
    padding: 8px;
  }

  tbody td {
    font-size: 16px;
    padding: 8px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-between;
  }

  div span {
    color: #999;
    font-size: 14px;
    font-weight: bold;
  }

  div strong {
    font-size: 14px;
    margin-right: 10px;
  }
`;
