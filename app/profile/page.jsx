"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setposts(data);
     }

     if (session?.user.id) fetchPosts();
   }, []);

  const handleEdit = (post) => {
    router.push(`update-prompt?id=${post.id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete your prompt?")

    
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post.id.toString()}`, {
          method: "DELETE",
        });
        3
        const filteredPosts = posts.filter((prompt)=> post.id !==  prompt.id);

        setposts(filteredPosts)
        
      } catch (error) {
        console.error(error.message)
      }  
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}


export default MyProfile



// You're a professional web developer. I'm going to give you
//  a code snippet and you need to tell me how I can make it cleaner, 
//  more readable and more efficient please.