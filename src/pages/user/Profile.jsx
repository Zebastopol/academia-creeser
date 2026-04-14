import { useEffect } from 'react'
import ProfileTemplate from '../../features/user-profile/components/ProfileTemplate'

const Profile = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    return () => document.documentElement.removeAttribute('data-theme')
  }, [])

  return <ProfileTemplate />
}

export default Profile
