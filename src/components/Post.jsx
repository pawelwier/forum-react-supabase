import { useContext } from "react"
import { SupabaseContext } from "../app"

function Post({ post }) {
  const { supabase } = useContext(SupabaseContext)

  const { id, content, profiles: { email } } = post

  async function updatePost() {
    await supabase
      .from('posts')
      .update({ content: `${content} edited` })
      .eq('id', id)
  }

  return (
    <div>
      <div className="
        bg-sky-700  
      ">{email}</div>
      
      <div className="
        min-h-20
        flex justify-between gap-2
        p-2
        bg-sky-200 text-black
      ">
        <div>
          {content}
        </div>
        <button
          onClick={updatePost}
          className="text-white"
        >edit</button>
      </div>
    </div>
  )
}

export default Post