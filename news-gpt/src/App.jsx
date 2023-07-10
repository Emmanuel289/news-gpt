import { React, useState, useEffect } from "react";

const welcomeMessage = {
  'greeting': 'Welcome',
  'title': 'News Room',
};


function getMessage(message){
  return `${message.greeting} to your ${message.title}`;
  
}

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [searchTerm]);

  return [value, setValue];
};

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

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  };

  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
   <div>
     {!welcomeMessage.greeting || !welcomeMessage.title ? <p>Message must have a greeting and a title</p> : <h1>{getMessage(welcomeMessage)}</h1>}

     {/* <p><em>In the textbox below, type @ followed by a keyword for a news category (e.g. @sports to get the latest sports news)</em></p> */}
    
      <Search search={searchTerm} onSearch={handleSearch} />

      <hr/>
      <List list={searchedStories} />
   </div>
  );
}

const List = ({ list }) => {

  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  )  
};

const Item = ({ item }) => {

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </li> 
  )
};

const Search = ({ search, onSearch }) => {

  return (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} /> 
  </div>  
  );  
};

export default App;
