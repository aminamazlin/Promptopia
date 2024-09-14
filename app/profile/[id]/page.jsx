"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({params}) => {
  const searchParams = useSearchParams()
  const username = searchParams.get("name")

  const [posts, setposts] = useState([]);
 
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`); //Params.id takes what gets passed into [id]
      const data = await response.json();
      console.log(data)
      setposts(data);
    };
    
    fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={null}
      handleDelete={null}
    />
  );
};

export default UserProfile;
