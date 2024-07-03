import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

export default function PlaseLoginCard({onClose}) {
    const navigate = useNavigate()
    const handleGoToLoginPage=()=>{
        // close current modal first
        onClose()
        // reset model open state to close state 
        navigate(`/login`)
    }
  return (
    <div className="flex flex-col px-4 gap-4 items-center">
        <div>Seems like you haven’t logged in to our web-application yet. Please log-in and try again</div>
        <Button onClick={handleGoToLoginPage}>Go to log-in page</Button>
    </div>
  )
}
