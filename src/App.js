import React from 'react';
import StoryTeller from './components/StoryTeller';
import { CssBaseline, Container, Typography } from '@mui/material';
import './styles.css';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        AI Story Teller
      </Typography>
      <StoryTeller />
    </Container>
  </React.Fragment>
);

export default App;
