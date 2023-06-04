import React, { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import { useQuery } from './hooks/useQuery'
import './App.css'
import getGifs from './services/getGifs'
import GifList from './components/GifList'
import debounce from 'just-debounce-it'

export const GifContext = React.createContext('');

export const SortBy = Object.freeze({ "NONE": 'none', "SOURCE": 'source', "TITLE": 'title' })

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
	const [sorting, setSorting] = useState(SortBy.NONE)
	const [filterTitle, setFilterTitle] = useState('')

	const { query, setQuery, error } = useQuery()

	const toggleColors = () => setShowColors(!showColors)
	const toggleSortBySource = () => {
		const newSorting = sorting === SortBy.NONE ? SortBy.SOURCE : SortBy.NONE
		setSorting(newSorting)
	}

	const filteredGifs = useMemo(() => {
		console.log('filteredGifs')
		return typeof filterTitle === 'string' && filterTitle.length > 0
			? gifs.results.filter(gif => gif.title.toLowerCase().includes(filterTitle.toLowerCase()))
			: gifs.results
	}, [gifs, filterTitle])

	const sortedGifs = useMemo(() => {
		console.log('sortedGifs')

		if (sorting === SortBy.NONE) return filteredGifs

		let sortedFn = (a, b) => a.source_tld.localeCompare(b.source_tld)

		if (sorting === SortBy.TITLE) {
			sortedFn = (a, b) => a.title.localeCompare(b.title)
		}

		return filteredGifs.toSorted(sortedFn)
	}, [filteredGifs, sorting])

	const handleRemove = (id) => {
		const filteredGifs = gifs.results.filter((gif) => gif.id !== id)
		setGifs({ results: filteredGifs })
	}

	const handleRestore = () => setGifs({ results: originalGifs.current })

	const handleSort = (sort) => {
		setSorting(sort)
	}

	const debouncedSetQuery = useCallback(
		debounce(newQuery => {
			console.log('query', newQuery)
		}, 300)
		, [])

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log({ query })
	}

	const handleQuery = (event) => {
		// async
		const newQuery = event.target.value
		setQuery(newQuery)
		debouncedSetQuery(newQuery)
	}

	// Se ejecuta cada vez que se renderiza el componente
	// Peculiaridad del async/await
	useEffect(() => {
		(async () => {
			try {
				console.log('gifssss')
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

	console.log('render')

	return (
		<GifContext.Provider value={handleRemove}>
			<div>
				<header>
					<button onClick={toggleColors}>toggleColors</button>
					<button onClick={toggleSortBySource}>{sorting === SortBy.SOURCE ? 'not sortBySource' : 'sortBySourceTld'}</button>
					<button onClick={handleRestore}>restore</button>
					<input placeholder='Filter by tittle' onChange={(e) => {
						setFilterTitle(e.target.value)
					}} />
					<form onSubmit={handleSubmit}>
						<input onChange={handleQuery} value={query} name='query' placeholder='Filter by controlled' />
						<button type='submit'>Search</button>
					</form>
					{error && <p style={{ color: '#AA3939' }}>{error}</p>}
				</header>
				<section>

					{gifs.isLoading ?
						<h1>Cargando...</h1> :
						<GifList changeSorting={handleSort} showColors={showColors} gifs={sortedGifs} />
					}
				</section>
			</div>
		</GifContext.Provider>
	)
}

// <button onClick={() => setGifs(GIFS)}>Cambiar gifs</button>

export default App
