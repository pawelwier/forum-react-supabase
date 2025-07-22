import { useContext } from "react"
import { SupabaseContext } from "../../app"

function LogoutButton() {
  const { supabase } = useContext(SupabaseContext)
  
  async function logout() {
    await supabase.auth.signOut()
  }

  return (
    <button
      onClick={logout}
    >
      Log out
    </button>
  )
}

export default LogoutButton