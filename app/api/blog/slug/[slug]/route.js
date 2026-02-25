import { NextResponse } from 'next/server'
import { Blog } from '../../../models/Blog'
import { Comment } from '../../../models/Comment'

export async function GET(request, { params }) {
    try {
        const blog = new Blog()
        const comment = new Comment()

        // Await params to unwrap the Promise
        const { slug } = await params

        console.log({ slug });
        

        const post = await blog.findBySlug(slug)

        if (!post) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            )
        }

        // Increment views
        await blog.incrementViews(slug)

        // Get comments
        const comments = await comment.findByBlogSlug(slug)

        return NextResponse.json({
            success: true,
            data: {
                ...post,
                comments
            }
        })
    } catch (error) {
        console.error('Blog fetch error:', error)
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}