import { useState } from 'react'
import './App.css'
import Search from './components/search'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

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
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
