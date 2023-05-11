import * as React from 'react';

const welcomeMessage = {
  'greeting': 'Welcome',
  'title': 'News Room',
};

const authorList = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]

function getMessage(message){
  return `${message.greeting} to your ${message.title}`;
  
}


const App = () =>  {
  
  return (
   <div>
     {!welcomeMessage.greeting || !welcomeMessage.title ? <p>Message must have a greeting and a title</p> : <h1>{getMessage(welcomeMessage)}</h1>}

     {/* <p><em>In the textbox below, type @ followed by a keyword for a news category (e.g. @sports to get the latest sports news)</em></p> */}
    
      <Search />

      <hr/>

      <List />
   </div>
  );
}

const List = () => {
  
  return (
    <ul>
      {authorList.map((item) => {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        );
      })}
    </ul>
  )
}

const Search = () => {

  const handleChange = (event) => {
    // synthetic event
    console.log(event);
    // value of target (here: input HTML element)
    console.log(event.target.value);
  };

  const handleBlur = () => {
    console.log('Clicked outside search field')
  }

  return (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={handleChange} onBlur={handleBlur} /> 
  </div>  
  );  
};

export default App;
