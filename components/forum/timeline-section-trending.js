import React from 'react'
import CardCarousel from './card-carousel'

const postListStyle = {
  // width: '100%',
}

export default function TimelineSectionTrending() {
  return (
    <section style={postListStyle}>
      <h4 className="mb-4">熱門文章</h4>
      <CardCarousel />
    </section>
  )
}
