import { Link } from '@remix-run/react'

const BubbleCreatePost = () => {
	return (
		<div className='rounded-3xl px-5 py-2 fixed bottom-2 right-2 bg-pink-500'>
			<Link
				to={'/posts/new'}
				className='text-white'
			>
				New post 😍
			</Link>
		</div>
	)
}

export default BubbleCreatePost
