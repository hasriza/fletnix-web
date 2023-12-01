import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
    display: flex;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .fontLoaded {
    font-family: 'Source Sans Pro', sans-serif;
  }

  .flex-scroll-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden auto;
  }

  .flex-scroll-content {
    flex: 1;
    overflow: hidden auto;
  }

  .webEnclosedContent {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ant-layout {
    background-color: #223547;
    width: 100vw;
  }

  .ant-layout-header {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 12px;
  }

  .ant-card {
    box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 3px;
    border-radius: 8px;
  }

  .ant-btn {
    border-radius: 25px;
  }

  .wrapTextEllipsis {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .anticon svg {
    vertical-align: baseline;
  }

  .ant-select-selection__placeholder{
    color : blue;
  }

  .formClass {
    width: 400px;
  }

  @media (max-width: 767px) {
      .formClass { width: 80vw; }
  }
`;
