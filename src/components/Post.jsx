import { useContext } from "react"
import { SupabaseContext } from "../app"
import { updatePost } from "@/controllers/postController"

function Post({ post }) {
  const { supabase, user } = useContext(SupabaseContext)

  const { content, profiles: { email } } = post
  const isAuthor = user.email == email

  function editPost() {
    updatePost(supabase, post)
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
        {
          isAuthor &&
          <button
            onClick={editPost}
            className="text-white"
          >edit</button>
        }
      </div>
    </div>
  )
}

export default Post