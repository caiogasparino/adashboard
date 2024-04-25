import { useQuery } from '@tanstack/react-query'
import { useOAuth2 } from '@tasoskakour/react-use-oauth2'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useOAuthStore from '../store/oauth.store'

const useAuthentication = () => {
  const navigate = useNavigate()
  const { accessToken, setAccessToken } = useOAuthStore()
  const {
    data: authData,
    loading: authLoading,
    error: authError,
    getAuth,
    logout,
  } = useOAuth2({
    authorizeUrl: 'https://bitbucket.org/site/oauth2/authorize',
    clientId: process.env.REACT_APP_BITBUCKET_CLIENT_ID || '',
    redirectUri: `${document.location.origin}/oauth/callback`,
    scope: 'account',
    responseType: 'token',
    onSuccess: payload => {
      setAccessToken(payload.access_token)
      navigate('/dashboard')
      console.log('Success:', payload)
    },
    onError: error => {
      console.error('Error during authentication:', error)
    },
  })

  const { isLoading, isError } = useQuery({
    queryKey: ['getToken'],
    queryFn: async () => {
      if (!authLoading && !authError && authData && !accessToken) {
        await getAuth()
      }
      return accessToken
    },
  })

  useEffect(() => {
    if (authLoading || authError) {
      return
    }

    if (!accessToken && authData && !isLoading) {
      getAuth()
    }
  }, [accessToken, authData, authLoading, authError, getAuth, isLoading])

  useEffect(() => {
    if (accessToken) {
      toast.success('Authentication successful')
    }
  }, [accessToken])

  return { accessToken, isLoading, isError, authData, logout, getAuth }
}

export default useAuthentication
