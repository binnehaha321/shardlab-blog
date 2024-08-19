import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import {
	Form,
	json,
	redirect,
	useLoaderData,
	useNavigation
} from '@remix-run/react'
import { getPostById, updatePost } from '~/controller/blog'
import { BlogPost } from '~/models/BlogPost'

export async function loader({ params }: LoaderFunctionArgs) {
	const post = await getPostById(params.postId || '')
	return json(post)
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const title = formData.get('title')
	const content = formData.get('content')

	// Null check and type assertion
	if (typeof title !== 'string' || typeof content !== 'string') {
		return { error: 'Title and content must be strings.' }
	}

	// Update post logic
	await updatePost(params.postId || '', {
		title,
		content,
		updatedAt: new Date()
	})

	return redirect(`/posts/${params.postId}`)
}

export default function EditPost() {
	const post = useLoaderData<typeof loader>() as unknown as BlogPost
	const navigation = useNavigation()

	return (
		<Form
			method='post'
			className='space-y-4'
		>
			<input
				autoFocus
				autoComplete='off'
				autoCapitalize='off'
				autoCorrect='off'
				spellCheck='false'
				type='text'
				name='title'
				className='w-full rounded-md'
				defaultValue={post.title}
				placeholder='Title'
			/>
			<textarea
				autoComplete='off'
				autoCapitalize='off'
				autoCorrect='off'
				spellCheck='false'
				name='content'
				className='w-full h-48 rounded-md'
				defaultValue={post.content}
				placeholder='Content'
			/>
			<button
				disabled={navigation.state === 'submitting'}
				type='submit'
				className='btn btn-primary rounded-3xl bg-pink-500 text-white px-5 py-2'
			>
				Update 😍
			</button>
		</Form>
	)
}
