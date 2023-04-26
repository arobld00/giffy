import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import getGifs from './services/getGifs'
import GifList from './components/GifList'

export const GifContext = React.createContext('');

function App({ params }) {
	const { keyword } = params
	// const [isLoading, setLoading] = useState(false)
	// const [gifs, setGifs] = useState([])
	const [gifs, setGifs] = useState({
		isLoading: false,
		results: []
	})
	
	const originalGifs = useRef([]) // guardar un valor que se mantenga entre renderizados, pero al cambiar no vuelve a renderizar el componente

	const [showColors, setShowColors] = useState(false)
	const [sortBySourceTld, setSortBySourceTld] = useState(false)

	const toggleColors = () => setShowColors(!showColors)
	const toggleSortBySource = () => setSortBySourceTld(prevState => !prevState)

	const sortedGifs = sortBySourceTld ?
		gifs.results.toSorted((a, b) => a.source_tld.localeCompare(b.source_tld))
		: gifs.results

	const handleRemove = (index) => {
		const filteredGifs = gifs.results.filter((gif, gifIndex) => gifIndex !== index)
		setGifs({ results: filteredGifs })
	}

	const handleRestore = () => setGifs({ results: originalGifs.current })

	// Se ejecuta cada vez que se renderiza el componente
	// Peculiaridad del async/await
	useEffect(() => {
		(async () => {
			try {
				setGifs(actualGifs => ({ isLoading: true, results: actualGifs.results }))

				const gifs = await getGifs({ keyword })
				setGifs({ isLoading: false, results: gifs })
				originalGifs.current = gifs
			} catch (ex) {
				console.log(ex.message)
			}
		})()
	}, [keyword]) // No tiene dependencias este efecto, es decir, solo se va a ejecutar una vez, no depende de nada
	// Podriamos tener una dependencia keyword, cada vez que cambie, volver a ejecutar el efecto

	return (
		<GifContext.Provider value={handleRemove}>
			<div className="App">
				<header className="Header-content">
					<button onClick={toggleColors}>toggleColors</button>
					<button onClick={toggleSortBySource}>{sortBySourceTld ? 'sortBySource' : 'not sortBySourceTld'}</button>
					<button onClick={handleRestore}>restore</button>
				</header>
				<section className="App-content">

					{gifs.isLoading ?
						<h1>Cargando...</h1> :
						<GifList showColors={showColors} gifs={sortedGifs} />
					}
				</section>
			</div>
		</GifContext.Provider>
	)
}

// <button onClick={() => setGifs(GIFS)}>Cambiar gifs</button>

export default App
