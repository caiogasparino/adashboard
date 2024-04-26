import { QueryClient } from '@tanstack/react-query'
import { useOAuth2 } from '@tasoskakour/react-use-oauth2'
import { useNavigate } from 'react-router-dom'

const queryClient = new QueryClient()

const useAuthentication = () => {
  const navigate = useNavigate()

  const { data, loading, error, getAuth, logout } = useOAuth2({
    authorizeUrl: 'https://bitbucket.org/site/oauth2/authorize',
    clientId: process.env.REACT_APP_BITBUCKET_CLIENT_ID || '',
    redirectUri: `${document.location.origin}/oauth/callback`,
    scope: 'account',
    responseType: 'token',
    onSuccess: payload => {
      queryClient.setQueryData(['access_token'], payload.access_token)
      navigate('/preload')
      console.log('Success:', payload)
    },
    onError: error => {
      console.log('Error:', error)
    },
  })

  return { loading, error, getAuth, logout, data }
}

export default useAuthentication
