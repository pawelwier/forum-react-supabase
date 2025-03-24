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
      .select('*')
      .order('created_at')

    setPosts(data)
  }

  supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      getPosts
    )
    .subscribe()

  return (
    <>
      {
        posts.map((post) => (
          <Post post={post} key={post.id} />    
        ))
      }

      <LogoutButton />
    </>
  )
}

export default Forum