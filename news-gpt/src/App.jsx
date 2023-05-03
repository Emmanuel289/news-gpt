import * as React from 'react';

const welcomeMessage = {
  'greeting': 'Welcome',
  'title': 'News Room',
};

function getMessage(message){
  return `${message.greeting} to your ${message.title}`;
  
}


function App() {
  
  return (
   <div>
     {!welcomeMessage.greeting || !welcomeMessage.title ? <p>Message must have a greeting and a title</p> : <h1>{getMessage(welcomeMessage)}</h1>}
    
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
   </div>
  );
}

export default App;
