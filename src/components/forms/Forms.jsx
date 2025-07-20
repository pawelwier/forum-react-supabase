import { useContext, useEffect, useState } from 'react'
import { getForms, initFormChannel } from '@/controllers/formController'
import { SupabaseContext } from '@/app'

function Forms() {
  const [forms, setForms] = useState([])

  const { supabase } = useContext(SupabaseContext)

  useEffect(() => {
    loadPosts()
  }, [])
  
  async function loadPosts() {
    getForms(supabase, setForms)
  }

  initFormChannel(supabase, loadPosts)
  return (
    <div>
      {forms.map(({id, name, label, description}) => (
        <div key={id}>
          <div className='flex justify-center items-center gap-2'>
            <div className='text-2xl'>{label}</div>
            <div className="text-gray-400 text-sm">
              ({name})
            </div>
          </div>
          <p className='mt-2'>{description}</p>
        </div>
      ))}
    </div>
  )
}

export default Forms