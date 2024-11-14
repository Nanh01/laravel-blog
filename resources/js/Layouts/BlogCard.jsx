import React from 'react'
import Date from './Date'

export default function BlogCard({blog}) {
  return (
    <div className="blog-card border-2 border-gray-600 rounded p-3">
        <h5>{blog.title}</h5>
        <p>{blog.content}</p>
        <p>Create at: <Date date={blog.createAt}></Date></p>
        <p>Update at: <Date date={blog.updateAt}></Date></p>
    </div>
  )
}
