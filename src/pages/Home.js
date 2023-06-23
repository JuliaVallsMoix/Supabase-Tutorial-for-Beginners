import { logDOM } from "@testing-library/react"
import supabase from "../Config/supabaseClient"
import { useEffect, useState } from "react"
import SomoothieCard from "../components/SmoothieCard"

const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('Smoothies')
        .select()
        console.log(data);

        if (error) {
          setFetchError('Could not fetch the smoothies')
          setSmoothies(null)
          console.log(error);
        }
        if (data) {
          setSmoothies(data)
          setFetchError(null)
        }
    }

    fetchSmoothies()

  }, [])

  return (
    <div className="page home">
      {fetchError && (<p> {fetchError} </p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SomoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home