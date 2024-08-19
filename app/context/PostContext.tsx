import { createContext, useState } from 'react'
import { useNavigate } from '@remix-run/react'

interface IPostContext {
	onViewDetail: (postId: string) => void
	onUpdate: (postId: string) => void
	onDelete: (postId: string) => void
	toggleMenu: (postId: string) => void
	isMenuOpen: (postId: string) => boolean
}

export const PostContext = createContext<IPostContext>({
	onViewDetail: () => undefined,
	onUpdate: () => undefined,
	onDelete: () => undefined,
	toggleMenu: () => undefined,
	isMenuOpen: () => false
})

const PostProvider = ({ children }: React.PropsWithChildren) => {
	const navigate = useNavigate()
	const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null)

	const toggleMenu = (postId: string) => {
		setOpenMenuPostId((prevId) => (prevId === postId ? null : postId))
	}

	const isMenuOpen = (postId: string) => openMenuPostId === postId

	const onViewDetail = (postId: string) => {
		navigate(`/posts/${postId}`)
		toggleMenu(postId)
	}

	const onUpdate = (postId: string) => {
		navigate(`/posts/${postId}/edit`)
		toggleMenu(postId)
	}

	const onDelete = (postId: string) => {
		navigate(`/posts/${postId}/delete`)
		toggleMenu(postId)
	}

	return (
		<PostContext.Provider
			value={{ isMenuOpen, onDelete, onUpdate, onViewDetail, toggleMenu }}
		>
			{children}
		</PostContext.Provider>
	)
}

export default PostProvider
