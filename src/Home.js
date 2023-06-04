import { Link } from './components/Link'

function Home() {
  console.log('home')
  return (
    <>
      <h1>Home</h1>
      <p>A small test for React Router</p>
      <Link to='/about'>Go about</Link>
    </>
  )
}

export default Home