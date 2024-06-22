// import React, { createContext, useState, useEffect } from 'react'

// const UserProfileContext = createContext()


// //*抓取會員大頭照
// const useFetchUserProfile = () => {
//   const [previewSrc, setPreviewSrc] = useState('')
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchData() {
//       const userIdLocalStorage = JSON.parse(
//         localStorage.getItem('userIdLocalStorage')
//       )
//       try {
//         const response = await fetch(
//           `http://localhost:3005/api/member-uploadImage/${userIdLocalStorage}`,
//           { method: 'GET' }
//         )
//         if (response.ok) {
//           const bigHeads = await response.json()
//           const pictureFile = bigHeads.data.avatar.substring(8)
//           const pictureFileRoute = `../images/member/${pictureFile}`
//           console.log(pictureFileRoute)
//           setPreviewSrc(pictureFileRoute)
//         } else {
//           console.error('Error fetching user profile:', response.statusText)
//           setError(response.statusText)
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error)
//         setError(error)
//       }
//     }
//     fetchData()
//   }, [])

//   return { previewSrc, error }
// }

// const UserProfileProvider = ({ children }) => {
//   const userProfile = useFetchUserProfile()

//   return (
//     <UserProfileContext.Provider value={userProfile}>
//       {children}
//     </UserProfileContext.Provider>
//   )
// }

// export { UserProfileContext, UserProfileProvider }
