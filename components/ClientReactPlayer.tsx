// components/ClientReactPlayer.tsx
'use client'
import React from 'react'
import ReactPlayer from 'react-player'

const ClientReactPlayer = ({ url }: { url: string }) => {
  if (!url) return null
  return (
    <ReactPlayer
      url={url}
      playing
      controls
      muted={false}
      width="100%"
      height="100%"
    />
  )
}

export default ClientReactPlayer
