import { useContext, useState } from "react"
import { SupabaseContext } from "../app"
import { removePost, updatePost } from "@/controllers/postController"
import EditPostInput from "./EditPostInput"
import { isAuthor } from "@/utils"
import PostControls from "./PostControls"

function Post({ post }) {
  const [isEdit, setIsEdit] = useState(false)

  const { supabase, user } = useContext(SupabaseContext)

  const { id, content, profiles: { email } } = post

  async function editPost(content) {
    await updatePost(supabase, { id, content })

    closeEdit()
  }

  async function deletePost() {
    if (confirm('Are you sure?')) await removePost(supabase, id)
  }

  function closeEdit() {
    setIsEdit(false)
  }

  return (
    <div>
      <div className="
        bg-sky-700  
      ">{email}</div>
      
      <div className="
        min-h-20
        flex justify-between items-center gap-2
        p-2
        bg-sky-200 text-black
      ">
        {
          isEdit 
            ? <EditPostInput
                content={content}
                onEdit={editPost}
                onCancel={closeEdit}  
              />
            : <div>
                {content}
              </div>
        }
        {
          !isEdit && isAuthor(post, user) && (
            <PostControls
              onEdit={setIsEdit}
              onDelete={deletePost}  
            />
          )
        }
      </div>
    </div>
  )
}

export default Post