import { json, Link, useLoaderData, useNavigate } from '@remix-run/react'
import MoreMenu from '~/components/MoreMenu'
import { getPosts } from '~/controller/blog'
import { usePost } from '~/hooks/usePost'

export async function loader() {
	const posts = await getPosts()
	return json(posts)
}

const AllPost = () => {
	const posts = useLoaderData<typeof loader>()
	const navigate = useNavigate()
	const { toggleMenu } = usePost()

	if (!posts.length)
		return (
			<div className='flex flex-col gap-1 text-center'>
				<p className='text-lg font-bold'>No any posts created</p>
				<Link
					to={'/posts/new'}
					className=''
				>
					Create now!
				</Link>
			</div>
		)

	return (
		<div className='container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
			{posts.map((post) => (
				<div
					key={String(post._id)}
					className='rounded-md p-2 bg-slate-300 flex flex-col justify-between shadow-md cursor-pointer'
					onClick={() => navigate(`/posts/${post._id}`)}
				>
					<div className='flex justify-between items-center relative'>
						<h2 className='font-bold text-2xl'>{post.title}</h2>
						<button
							className='bg-slate-200 p-2 rounded-md hover:opacity-75 transition-all duration-200 ease-linear'
							onClick={(e) => {
								e.stopPropagation()
								toggleMenu(post._id)
							}}
						>
							🐤 Options
						</button>
						<MoreMenu postId={post._id} />
					</div>
					<p className='break-words text-ellipsis overflow-hidden max-h-20 line-clamp-2'>
						{post.content}
					</p>
					<p>{`Posted on: ${new Date(post.createdAt).toLocaleDateString()}`}</p>
				</div>
			))}
		</div>
	)
}
export default AllPost
