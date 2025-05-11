import React from 'react'

export const ServerComponentWrapper = async ({ children }: { children: Promise<React.ReactNode> }) => {
  const resolvedChildren = await children
  return <>{resolvedChildren}</>
} 