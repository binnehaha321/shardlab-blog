import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import {
	Form,
	json,
	redirect,
	useLoaderData,
	useNavigation
} from '@remix-run/react'
import { getPostById, deletePost } from '~/controller/blog'
import { BlogPost } from '~/models/BlogPost'

export async function loader({ params }: LoaderFunctionArgs) {
	const post = await getPostById(params.postId || '')
	return json(post) as unknown as BlogPost
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
	// Delete post logic
	await deletePost(params.postId || '')
	return redirect('/posts')
}

export default function DeletePost() {
	const post = useLoaderData<typeof loader>()
	const navigation = useNavigation()

	return (
		<div className='space-y-4'>
			<p>Are you sure you want to delete the post titled "{post.title}"?</p>
			<Form method='post'>
				<button
					disabled={navigation.state === 'submitting'}
					type='submit'
					className='btn btn-danger rounded-3xl bg-red-500 text-white px-5 py-2'
				>
					Delete 😱
				</button>
			</Form>
		</div>
	)
}
