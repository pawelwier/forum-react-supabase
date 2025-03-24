import './App.css'
import Forum from './components/Forum'
import { useContext, useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { SupabaseContext } from './app'

function App() {
  const supabase = useContext(SupabaseContext)

  const [session, setSession] = useState(null)

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

  if (!session) {
    return (
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }} 
      />
    )
  }

  return (
    <SupabaseContext.Provider value={supabase}>
      <Forum />
    </SupabaseContext.Provider>
  )
}

export default App
