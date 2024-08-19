import { ObjectId, WithId } from 'mongodb'
import { BlogPost } from '~/models/BlogPost'
import { db } from '~/utils/db.server'

export async function createPost(post: Partial<BlogPost>) {
	const result = await db.collection('posts').insertOne({
		...post,
		createdAt: new Date(),
		updatedAt: new Date()
	})
	return result.insertedId
}
export async function getPosts() {
	const posts = await db.collection('posts').find().toArray()

	return posts
}

export async function getPostById(id: string) {
	const post = await db.collection('posts').findOne({ _id: new ObjectId(id) })
	if (!post) {
		return null
	}

	return post
}
export async function updatePost(id: string, post: Partial<BlogPost>) {
	await db
		.collection('posts')
		.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { ...post, updatedAt: new Date() } }
		)
}
export async function deletePost(id: string) {
	await db.collection('posts').deleteOne({ _id: new ObjectId(id) })
}
