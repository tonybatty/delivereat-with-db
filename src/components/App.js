import React from 'react';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      dishes: {},
    }
  }

  render(){
    return (
      <div>
        Delivereat app
      </div>
    )
  }
}

export default App;
