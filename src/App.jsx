import './App.css'
import Forum from './components/forum/Forum'
import { useContext, useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Layout from './components/layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router'
import Forms from './components/forms/Forms'
import { SupabaseContext } from './app'
import FormPage from './components/forms/FormPage'
import Form from './components/forms/Form'

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

  // TODO: ugly, refactor
  const [page, param] = window.location.pathname.substring(1)
    .split('/')
  const isFormUrl = page == 'form'
    
  if (!session || !user) {
    return isFormUrl ? (
      <Form url={param} />
    ) : (
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
              {/* Admin preview */}
              <Route path="/form/:url" element={<FormPage isAdmin={!!user} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    </SupabaseContext.Provider>
  )
}

export default App
