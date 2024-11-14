import dayjs from 'dayjs'
import React from 'react'

export default function Date({date}) {
  return (
    <div>
      {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
    </div>
  )
}
