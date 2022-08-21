import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

import Body from './components/Body';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  return(
    <div className="App">
      <Router>
      <Container>
        <Body />
      </Container>
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`
