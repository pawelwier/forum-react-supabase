import { useParams } from "react-router"
import Form from "./Form"

function FormPage({ isAdmin }) {

  const { url } = useParams()
    
  return <Form url={url} isAdmin={isAdmin} />
}

export default FormPage
