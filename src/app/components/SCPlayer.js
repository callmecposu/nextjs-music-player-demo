import React from 'react'

export default function SCPlayer({embedCode}) {
  return (
    <div className='m-4' dangerouslySetInnerHTML={{__html: embedCode}}>
    </div>
  )
}
