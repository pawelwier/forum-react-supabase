import { useContext, useEffect, useState } from 'react'
import Post from './Post'
import { SupabaseContext } from '../app'
import LogoutButton from './LogoutButton'
import { getPosts, initPostChannel } from '@/controllers/postController'

function Forum() {
  const [posts, setPosts] = useState([])

  const { supabase } = useContext(SupabaseContext)

  useEffect(() => {
    loadPosts()
  }, [])
  
  async function loadPosts() {
    getPosts(supabase, setPosts)
  }

  initPostChannel(supabase, loadPosts)

  return (
    <>
      <div className="
        w-[50rem]
        flex flex-col gap-4
        mb-6  
      ">
        {
          posts.map((post) => (
            <Post post={post} key={post.id} />    
          ))
        }
      </div>
      <LogoutButton />
    </>
  )
}

export default Forum