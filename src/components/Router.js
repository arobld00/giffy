import { useEffect, useState } from 'react'

export const EVENTS = {
  PUSHSTATE: 'pushstate',
  POPSTATE: 'popstate'
}

export function Router({ routers = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    // previous path
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const Page = routers.find(({ path }) =>  path === currentPath)?.Component
  return Page ? <Page /> : <DefaultComponent />
}