import { ObjectId, WithId } from 'mongodb'

export interface BlogPost extends WithId<Document> {
	_id: ObjectId
	title: string
	content: string
	createdAt: Date
	updatedAt: Date
}
