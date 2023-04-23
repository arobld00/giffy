import React, { useEffect, useState } from 'react'
import './App.css'
import getGifs from './services/getGifs'
import GifList from './components/GifList'

function App({ params }) {
  const { keyword } = params
  // const [isLoading, setLoading] = useState(false)
  // const [gifs, setGifs] = useState([])
  const [gifs, setGifs] = useState({
    isLoading: false,
    results: [] 
  })

  const [showColors, setShowColors] = useState(false)
  const [sortBySourceTld, setSortBySourceTld] = useState(false)

  const toggleColors = () => setShowColors(!showColors)
  const toggleSortBySource = () => setSortBySourceTld(prevState => !prevState)

  const sortedGifs = sortBySourceTld ? gifs.results.sort((a, b) => {
    return a.source_tld.localeCompare(b.source_tld)
  })
  : gifs.results // TODO: gifs are already sorted
  
  // Se ejecuta cada vez que se renderiza el componente
  // Peculiaridad del async/await
  useEffect(() => {
    (async () => {
      try {
        setGifs(actualGifs => ({ isLoading: true, results: actualGifs.results }))
        
        const gifs = await getGifs({ keyword })
        setGifs({ isLoading: false, results: gifs })
      } catch (ex) {
        console
        .log(ex.message)
      }
    })()
  }, [keyword]) // No tiene dependencias este efecto, es decir, solo se va a ejecutar una vez, no depende de nada
        // Podriamos tener una dependencia keyword, cada vez que cambie, volver a ejecutar el efecto
    
  return (
    <div className="App">
      <section className="App-content">
        <button onClick={toggleColors}>toggleColors</button>
        <button onClick={toggleSortBySource}>{sortBySourceTld ? 'sortBySource' : 'not sortBySourceTld'}</button>

        { gifs.isLoading ? 
          <h1>Cargando...</h1> : 
          <GifList showColors={showColors} gifs={sortedGifs} />
        }
      </section>
    </div>
  )
}

// <button onClick={() => setGifs(GIFS)}>Cambiar gifs</button>

export default App
