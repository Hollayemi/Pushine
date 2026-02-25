import { NextResponse } from 'next/server'
import { Comment } from '../models/Comment'
import { Blog } from '../models/Blog'

export async function POST(request) {
    try {
        const body = await request.json()
        const comment = new Comment()
        const blog = new Blog()

        const newComment = await comment.create(body)

        // Update blog comments count
        await blog.updateCommentsCount(body.blogSlug, 1)

        return NextResponse.json({
            success: true,
            data: newComment
        }, { status: 201 })
    } catch (error) {
        console.error('Comment creation error:', error)
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}