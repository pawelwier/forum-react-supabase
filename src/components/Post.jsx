import { useContext } from "react"
import { SupabaseContext } from "../app"

function Post({ post }) {
  const supabase = useContext(SupabaseContext)

  async function updatePost() {
    await supabase
      .from('posts')
      .update({ content: '098' })
      .eq('id', post.id)
  }

  return (
    <div>
      {post.content}
      <button onClick={updatePost}>edit</button>
    </div>    
  )
}

export default Post