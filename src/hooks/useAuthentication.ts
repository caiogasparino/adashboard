import { useOAuth2 } from '@tasoskakour/react-use-oauth2'
import { useNavigate } from 'react-router-dom'
import { setDefaultToken } from '../utils/libs/axios/client'

const useAuthentication = () => {
  const navigate = useNavigate()
  const { data, loading, error, getAuth, logout } = useOAuth2({
    authorizeUrl: 'https://bitbucket.org/site/oauth2/authorize',
    clientId: process.env.REACT_APP_BITBUCKET_CLIENT_ID || '',
    redirectUri: `${process.env.REACT_APP_BITBUCKET_REDIRECT_URI}/oauth/callback`,
    scope: 'account',
    responseType: 'token',
    onSuccess: payload => {
      localStorage.setItem('accessToken', payload.access_token)
      setDefaultToken(payload.access_token)
      navigate('/')
    },
    onError: error => {
      console.log('Error:', error)
    },
  })

  return { loading, error, getAuth, logout, data }
}

export default useAuthentication
