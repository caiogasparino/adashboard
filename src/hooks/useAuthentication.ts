import { useOAuth2 } from '@tasoskakour/react-use-oauth2'
import { useNavigate } from 'react-router-dom'
import { useGetPermission } from '../service/permission/create-permission.service'
import useOAuthStore from '../store/oauth.store'
import { setDefaultToken } from '../utils/libs/axios/client'

const useAuthentication = () => {
  const { setAccessToken } = useOAuthStore()
  const navigate = useNavigate()

  const { data, loading, error, getAuth, logout } = useOAuth2({
    authorizeUrl: 'https://bitbucket.org/site/oauth2/authorize',
    clientId: process.env.REACT_APP_BITBUCKET_CLIENT_ID || '',
    redirectUri: `${document.location.origin}/oauth/callback`,
    scope: 'account',
    responseType: 'token',
    onSuccess: payload => {
      setDefaultToken(payload.access_token)
      setAccessToken(payload.access_token)
      useGetPermission()
      navigate('/dashboard')
      console.log('Success:', payload)
    },
    onError: error => {
      console.log('Error:', error)
    },
  })

  return { loading, error, getAuth, logout, data }
}

export default useAuthentication
