function PostControls({ onEdit, onDelete }) {

  return (
    <div className="flex gap-1">
      <button
        onClick={() => { onEdit(true) }}
        className="text-white"
      >Edit</button>

      <button
        onClick={onDelete}
        className="!bg-red-800 text-white"
      >Delete</button>
    </div>
  )
}

export default PostControls