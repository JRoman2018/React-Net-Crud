import React from 'react';
import DCandidates from './components/DCandidates';
import {store} from './actions/store';
import {Provider} from 'react-redux'
import {Container} from '@material-ui/core'

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <DCandidates/>
      </Container>
    </Provider>
    )
}

export default App;
