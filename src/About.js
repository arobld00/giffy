import { Link } from './components/Link'

function About() {
  console.log('about')
  return (
    <>
      <h1>About</h1>
      <p>A small test for React Router</p>
      <Link to='/'>Go home</Link>
    </>
  )
}

export default About