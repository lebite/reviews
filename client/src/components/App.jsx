import React from 'react';
import Header from './Header.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      states: '',
    };
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>

      </div>
    );
  }
}

export default App;
