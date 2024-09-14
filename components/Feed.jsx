"use client"
import { useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout"> 
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={() => handleTagClick(post.tag)}
        />
      ))}
    </div>
  )
};


const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setposts] = useState([]);
  const [filteredposts, setFilteredPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null)

   const handleTagClick = (tag) => {
      setsearchText(tag);
      const filteredTagPosts= posts.filter((post) => post.tag === tag);
      setFilteredPosts(filteredTagPosts)
  };
  

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.prompt) || regex.test(post.tag) || regex.test(post.creator.username)
    );
  };
  
  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setsearchText(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPrompts = filterPrompts(event.target.value)
        setFilteredPosts(filteredPrompts);    //Delay of 500ms to change the filteredPosts
      }, 500)
    );
  };


   useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json();
      console.log(data)
      setposts(data);
    };
    fetchPosts();
  }, []);
  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      
      <PromptCardList
        data={ searchText ? filteredposts : posts}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed