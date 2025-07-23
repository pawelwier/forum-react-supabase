import { useContext, useEffect, useState } from 'react'
import Post from './Post'
import { getPosts, initPostChannel } from '@/controllers/postController'
import { SupabaseContext } from '@/app'

function Forum() {
  const [posts, setPosts] = useState([])

  const { supabase } = useContext(SupabaseContext)

  useEffect(() => {
    async function loadPosts() {
      const result = await getPosts(supabase)
      setPosts(result)
    }
    
    loadPosts()
    initPostChannel(supabase, loadPosts)
  }, [])
  


  return (
    <div className="
      w-[50rem]
      flex flex-col gap-4
      m-10
    ">
      {
        posts.map((post) => (
          <Post post={post} key={post.id} />    
        ))
      }
    </div>
  )
}

export default Forum