import { SupabaseContext } from "@/app"
import { getFormByUrl } from "@/controllers/formController"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"

function Form({ url, isAdmin = false }) {
  const [form, setForm] = useState(null)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = isAdmin && useNavigate()
  
  const { supabase } = useContext(SupabaseContext)

  useEffect(() => {
    async function getForm() {
      const result = await getFormByUrl(supabase, url)
      setForm(result?.[0])
    }

    getForm()
  }, [])

  const backToForms = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        {form?.label}
      </div>

      <div>
        TODO: display posts
      </div>

      {isAdmin 
        ? <button onClick={backToForms}>Back</button>
        : <button>Submit</button> 
      }
    </div>
  )
}

export default Form