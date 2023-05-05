import { useEffect, useState } from 'react'

export function useQuery() {
	const [query, setQuery] = useState('')
	const [error, setError] = useState(null)

	useEffect(() => {
		if (query === '') {
			setError('Cannot search for an empty gif')
			return
		}

		if (query.match(/^\d+$/)) {
			setError('Cannot search for a number')
			return
		}

		if (query.length < 3) {
			setError('Search must contain at least 3 characters')
			return
		}

		setError(null)
	}, [query])

	return { query, setQuery, error }
}