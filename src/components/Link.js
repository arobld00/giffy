import { EVENTS } from "../components/Router"

export function navigate(href) {
  // cambiar la url sin refrescar la pag
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    // remove behaviour default anchor
    event.preventDefault()
    navigate(to)
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}