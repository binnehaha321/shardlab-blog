import React from 'react'
import Navbar from './Navbar'
import BubbleCreatePost from './BubbleCreatePost'

const MainLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<div className='relative min-w-full min-h-[100dvh]'>
			<Navbar />
			<main className='max-w-screen-lg mx-auto'>{children}</main>
			<BubbleCreatePost />
		</div>
	)
}

export default MainLayout
