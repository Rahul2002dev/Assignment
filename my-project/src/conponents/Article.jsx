import React from 'react'

function Article({article}) {
  return (
    <div className='border rounded p-4 shadow-md'>
        <h2 className='font-bold text-lg'>{article.title}</h2>
        <p className='text-sm text-gray-500'>
            Auther : {article.author || "Unknown"}
        </p>
        <p className='text-sm text-gray-500'>
            Date : {new Date(article.publishedAt).toLocaleDateString()};
        </p>
        <p className='text-gray-700 mt-2'>{article.description}</p>
        <a className="text-indigo-600 hover:underline mt-4 block cursor-pointer overflow-hidden truncate ">
            href={article.url};    
        </a>

    </div>
  )
}

export default Article