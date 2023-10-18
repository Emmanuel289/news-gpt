import { useState, useEffect, useRef, useReducer } from "react";

const welcomeMessage = {
  'greeting': 'Welcome',
  'title': 'News Room',
};


function getMessage(message){
  // Generate a welcome message.
  return `${message.greeting} to your ${message.title}`;
  
}

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      // Initialize state for fetching stories.
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      // Handle a successful fetch.
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      // Handle a fetch failure.
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      // Remove a story from the data.
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    // Store the value in local storage.
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () =>  {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  useEffect(() => {
    // If `searchTerm` is not present, e.g., null, empty string, undefined,
    // do nothing
    //  more generalized condition than searchTerm === ''

    if (searchTerm === '') return;
    // Fetch stories when the component mounts.
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}react`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, [searchTerm]);

  const handleRemoveStory = (item) => {
    // Remove a story.
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = (event) => {
    // Handle search input change.
    setSearchTerm(event.target.value);
  };

  return (
   <div>
     {!welcomeMessage.greeting || !welcomeMessage.title ? <p>Message must have a greeting and a title</p> : <h1>{getMessage(welcomeMessage)}</h1>}
      <InputWithLabel 
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
        >
          <strong>Search:</strong>
      </InputWithLabel>

      <hr/>
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        null
      )}
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
      
   </div>
  );
}

const List = ({ list, onRemoveItem }) => {

  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  )  
};

const Item = ({ item, onRemoveItem}) => {

  const handleRemoveItem = () => {
    onRemoveItem(item);
  }

  return (
    <div>
      <li>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li> 
      <span><button onClick={handleRemoveItem}>Dismiss</button></span>
    </div>
    
  )
};

const InputWithLabel = ({ 
  id, 
  value, 
  type="text", 
  onInputChange,
  isFocused,
  children,
 }) => {

  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input 
      ref={inputRef}
      id={id}
      type={type}
      value={value} 
      autoFocus={isFocused}
      onChange={onInputChange} /> 
  </>  
 ); 
}

export default App;
