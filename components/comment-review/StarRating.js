import React from 'react'

export default function StarRating({ rating, totalStars = 5 }) {
  const fullStar = '★'
  const emptyStar = '☆'
  const stars = []

  for (let i = 0; i < totalStars; i++) {
    if (i < rating) {
      stars.push(fullStar)
    } else {
      stars.push(emptyStar)
    }
  }

  return <div style={{ color: '#9d0e16', fontSize: '24px' }}>{stars}</div>
}
