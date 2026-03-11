import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

type Movie = {
  id: number
  title: string
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie')
      }

      const data = await response.json()
      
      if (data.Response === 'False'){
        setErrorMessage(data.error || "Failed to fetch movies")
        setMovieList([])
        return
      }
        
      setMovieList(data.results || [])
    } catch (error){
      console.error('Error fetching movies:', error)
      setErrorMessage("Error: " + error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, []) 

  return (
    <main className="bg-slate-900 w-screen h-screen text-3xl font-bold text-white ">
      <div className="pattern"/>
      
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
        <header className="sm:mt-10 mt-5">
          <img className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md" src="./hero.png" alt="Hero Banner" />
          
          <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-19">
            Find 
            <span className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent"> Movies </span>
            You'll Enjoy
            Without The Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='space-y-9'>
          <h2 className="mt-5">All Movies</h2>

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movieList.map((movie) => (
                <p key={movie.id}>{movie.title}</p>
              ))}
            </ul>
          )
          }
        </section>

      </div>
    </main>
  )
}

export default App
