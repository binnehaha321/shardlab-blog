import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect, useNavigation } from '@remix-run/react'
import { createPost } from '~/controller/blog'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const title = formData.get('title')
	const content = formData.get('content')

	// Null check and type assertion
	if (typeof title !== 'string' || typeof content !== 'string') {
		// Handle the error appropriately, e.g., returning a validation error
		return { error: 'Title and content must be strings.' }
	}

	await createPost({
		title,
		content,
		createdAt: new Date(),
		updatedAt: new Date()
	})

	return redirect('/posts')
}

export default function NewPost() {
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
				placeholder='Title'
			/>
			<textarea
				autoComplete='off'
				autoCapitalize='off'
				autoCorrect='off'
				spellCheck='false'
				name='content'
				className='w-full h-48 rounded-md'
				placeholder='Content'
			/>
			<button
				disabled={navigation.state === 'submitting'}
				type='submit'
				className='btn btn-primary rounded-3xl bg-pink-500 text-white px-5 py-2'
			>
				Create 😍
			</button>
		</Form>
	)
}
