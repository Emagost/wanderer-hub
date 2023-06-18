'use client'
import React, { Suspense } from 'react'
// Components
import Loading from './Loading'

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default GeneralLayout
