import { useState } from "react"

function EditPostInput({ content, onEdit, onCancel }) {
  const [text, setText] = useState(content)

  function onSubmit(e) {
    e.preventDefault()
    onEdit(text)
  }

  return (
    <form 
      onSubmit={onSubmit}
      className="contents"  
    >
      <input  
        value={text}
        onChange={e => setText(e.target.value)}
        className="bg-white p-2"
      />

      <div>
      <button 
        type="submit"
        className="text-white"
      >Submit</button>

      <button 
        onClick={onCancel}
        className="text-white"
      >Cancel</button>
      </div>
    </form>
  )
}

export default EditPostInput