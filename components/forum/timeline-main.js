import React from 'react'
import PostCard from './post-card'
import List from '@/pages/forum/post-list'
import PostComposer from './post-composer'

export default function Main() {
  return (
    <main className="">
      <section className="mb-3">
        <PostComposer />
      </section>
      <List />
    </main>
  )
}
