import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../Config/supabaseClient"

const Create = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Si no he emplenat tots els camps del forulari, hem de dir que hi ha un error (client)
    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly')
      return
    }

    const { data, error } = await supabase
    .from('Smoothies')
    .insert([{ title, method, rating }])
    .select()

    console.log(data);

    if (error) {
      console.log(error);
      setFormError('We have not been able to insert the smoothie')

    } 
    if (data) {
      console.log('hola');
      console.log(data);
      setFormError(null)
      navigate('/')

    }

  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
        id="method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
        type="number"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error"> {formError} </p>}

      </form>
    </div>
  )
}

export default Create