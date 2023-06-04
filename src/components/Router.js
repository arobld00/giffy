import { useEffect, useState, Children } from 'react'
import { match } from 'path-to-regexp'

export const EVENTS = {
  PUSHSTATE: 'pushstate',
  POPSTATE: 'popstate'
}

export function Router({ children, routers = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  console.log(children)
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

  let routeParams = {}

  // read props from children
  const childrenRoutes = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    if (!isRoute) return null

    return props
  })

  const allRoutes = routers.concat(childrenRoutes)

  const Page = allRoutes.find(({ path }) => {
    if (path === currentPath) return true

    const matcher = match(path, { decode: decodeURIComponent })
    const matched = matcher(currentPath)
    if (!matched) return false

    routeParams = matched.params
    return true
  })?.Component
  return Page ? <Page params={routeParams} /> : <DefaultComponent />
}