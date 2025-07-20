import './App.css'
import Forum from './components/Forum'
import { useContext, useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { SupabaseContext } from './app'
import Layout from './components/layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router'
import Forms from './components/forms/Forms'

function App() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  
  const { supabase } = useContext(SupabaseContext)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      setUser(session?.user || null)
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
        <BrowserRouter>
          <Layout user={user}>
            <Routes>
              <Route path="/" element={<Forms />} />
              <Route path="/forum" element={<Forum />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    </SupabaseContext.Provider>
  )
}

export default App
