import './App.css'
import Forum from './components/Forum'
import { useContext, useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { SupabaseContext } from './app'

function App() {
  const [session, setSession] = useState(null)
  
  const { supabase, user } = useContext(SupabaseContext)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!session || !user) {
    return (
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }} 
      />
    )
  }

  return (
    <SupabaseContext.Provider value={{ supabase, user }}>
      <Forum />
    </SupabaseContext.Provider>
  )
}

export default App
