import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: fit-content;
  height: fit-content; */
  min-width: 600px;
  min-height: 300px;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  overflow: hidden;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 28px;
  color: rgba(255, 0, 0, 0.4);
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover,
  &:focus {
    color: red;
    scale: 1.1;
  }
`;
