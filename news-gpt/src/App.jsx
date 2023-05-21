import * as React from 'react';

const welcomeMessage = {
  'greeting': 'Welcome',
  'title': 'News Room',
};


function getMessage(message){
  return `${message.greeting} to your ${message.title}`;
  
}


const App = () =>  {

  const stories = [
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

  const handleSearch = (event) => {
    console.log(event.target.value);
  };
  
  return (
   <div>
     {!welcomeMessage.greeting || !welcomeMessage.title ? <p>Message must have a greeting and a title</p> : <h1>{getMessage(welcomeMessage)}</h1>}

     {/* <p><em>In the textbox below, type @ followed by a keyword for a news category (e.g. @sports to get the latest sports news)</em></p> */}
    
      <Search onSearch={handleSearch} />

      <hr/>

      <List list={stories} />
   </div>
  );
}

const List = (props) => {

  return (
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  )  
};

const Item = (props) => {

  return (
    <li key={props.item.objectID}>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li> 
  )
};

const Search = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleChange = (event) => {
   setSearchTerm(event.target.value);
  };

  props.onSearch(event);

  return (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={handleChange} /> 
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>  
  );  
};

export default App;
