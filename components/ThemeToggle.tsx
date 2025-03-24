'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    // Verificar si estamos en el cliente (window está disponible)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('darkMode') === 'true'
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      setDarkMode(savedTheme || (!('darkMode' in localStorage) && systemPrefersDark))
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    }
  }, [darkMode])

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle