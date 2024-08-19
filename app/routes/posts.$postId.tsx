import { LoaderFunctionArgs } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { getPostById } from '~/controller/blog'
import { BlogPost } from '~/models/BlogPost'

export async function loader({ params }: LoaderFunctionArgs) {
	const post = await getPostById(params.postId || '')
	return json(post)
}

const PostDetail = () => {
	const post = useLoaderData<typeof loader>() as unknown as BlogPost

	if (!post) return <p className='text-center'>Post not found</p>

	return (
		<div className='w-fit mx-auto rounded-md p-2 bg-slate-300 flex flex-col justify-between shadow-md cursor-pointer hover:opacity-75 transition-all duration-200 ease-linear'>
			<h2 className='font-bold text-2xl'>{post.title}</h2>
			<p className='break-words text-ellipsis overflow-hidden max-h-20 line-clamp-2'>
				{post.content}
			</p>
			<p>{`Posted on: ${new Date(post.createdAt).toLocaleDateString()}`}</p>
		</div>
	)
}
export default PostDetail
