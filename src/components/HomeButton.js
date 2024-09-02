import React from 'react'
import { Link } from 'react-router-dom'

export const HomeButton = () => {
  return (
    <button style={{margin: '30px'}}>
        <Link to='/'>Back Home</Link>
    </button>

  )
}
