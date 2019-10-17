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
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px;

  thead tr {
    text-align: center;
  }

  thead th {
    color: #999;
    padding: 8px;
  }

  tbody td {
    font-size: 16px;
    padding: 8px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
    max-width: 80px;
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
  }

  div span {
    color: #808080;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  div strong {
    font-size: 14px;
    margin-left: 20px;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-left: 20px;
    color: #333;
    font-weight: bold;
    padding: 2px;
    width: 50px;
  }

  .total {
    margin-top: 10px;
    span {
      color: #808080;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    strong {
      font-size: 18px;
      margin-left: 20px;
    }
  }
`;
