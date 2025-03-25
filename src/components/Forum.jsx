import { useContext, useEffect, useState } from 'react'
import Post from './Post'
import { SupabaseContext } from '../app'
import LogoutButton from './LogoutButton'

function Forum() {
  const [posts, setPosts] = useState([])

  const supabase = useContext(SupabaseContext)

  useEffect(() => {
    getPosts()
  }, [])
  
  async function getPosts() {
    const { data } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        profiles (email)
      `)
      .order('created_at')

    setPosts(data)
  }

  supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { 
        event: '*',
        schema: 'public',
        table: 'posts' 
      },
      getPosts
    )
    .subscribe()

  return (
    <>
      <div className="
        w-[30rem]
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