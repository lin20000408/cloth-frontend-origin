import React from 'react'

const SectionPageTitle = ({ title }) => {
  return (
    <section id="page-title" className="d-flex justify-content-center">
      <div className="title h2 my-4 bg-bgColor">{title}</div>
    </section>
  )
}

export default SectionPageTitle
