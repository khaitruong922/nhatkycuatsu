import { Post } from 'core/post/post.entity'

export interface Tag {
	id: string
	name: string
	slug: string
	posts: Post[]
}
