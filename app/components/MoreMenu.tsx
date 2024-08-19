import { Link } from '@remix-run/react'
import React from 'react'
import { usePost } from '~/hooks/usePost'

interface IMoreMenu {
	postId: string
}

const MoreMenu: React.FC<IMoreMenu> = ({ postId }) => {
	const { onDelete, isMenuOpen, onUpdate } = usePost()
	return isMenuOpen(postId) ? (
		<div
			className='flex flex-col items-start gap-3 absolute top-8 -right-4 bg-purple-300 p-2 rounded-md w-[100px] bg-opacity-95'
			key={postId}
		>
			<button
				onClick={(e) => {
					e.stopPropagation()
					onUpdate(postId)
				}}
				className='hover:opacity-70'
			>
				✏️ Edit
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation()
					onDelete(postId)
				}}
				className='hover:opacity-70'
			>
				🗑️ Delete
			</button>
		</div>
	) : null
}

export default MoreMenu
