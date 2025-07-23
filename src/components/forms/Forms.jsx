import { useContext, useEffect, useState } from 'react'
import { getForms, initFormChannel } from '@/controllers/formController'
import { SupabaseContext } from '@/app'
import { useNavigate } from 'react-router'

function Forms() {
  const [forms, setForms] = useState([])

  let navigate = useNavigate()

  const { supabase } = useContext(SupabaseContext)

  useEffect(() => {
    async function loadPosts() {
      const result = await getForms(supabase)
      setForms(result)
    }

    loadPosts()
    initFormChannel(supabase, loadPosts)
  }, [])
  
  const goToPreview = (url) => {
    navigate(`/form/${url}`)
  } 

  return (
    <div>
      {forms.map(({ id, name, label, description, url }) => (
        // TODO: move to separate component(s)
        <div key={id}>
          <div className='flex justify-center items-center gap-2'>
            <div className='text-2xl'>{label}</div>
            <div className="text-gray-400 text-sm">
              ({name})
            </div>
          </div>
          <p className='mt-2'>{description}</p>
          <button onClick={() => goToPreview(url)}>Preview</button>
        </div>
      ))}
    </div>
  )
}

export default Forms