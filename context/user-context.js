import React, { createContext, useState, useEffect } from 'react'

// Create the UserContext
export const UserContext = createContext(null)

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const memberDataUrl = 'http://localhost:3005/api/member-data'

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('userKey')

      try {
        const response = await fetch(memberDataUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setUserData(data) // Set the fetched user data to state
        } else {
          console.error('Error fetching user profile:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}
