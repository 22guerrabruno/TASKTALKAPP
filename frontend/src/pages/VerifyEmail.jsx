import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import loader from '../assets/loader.gif'

const VerifyEmail = () => {
  const { verifyTokenRequest } = useUser()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const { token } = useParams()

  useEffect(() => {
    console.log(token)
    verifyTokenRequest(token)
    const interval = setInterval(() => {
      setIsLoading(false)
      navigate('/login-page')
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <>
      {isLoading && isLoading ? (
        <img className="w-full h-full object-cover" src={loader} alt="loader" />
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Your email has been verified
          </h1>
          <Link to="/login-page">
            <span className="text-indigo-500">A Login</span>
          </Link>
        </div>
      )}
    </>
  )
}

export default VerifyEmail
