import { NextResponse } from 'next/server'
import { Blog } from '../../../../models/Blog'
import { BlogLike } from '../../../../models/BlogLike'
import { getServerSession } from 'next-auth'

export async function POST(request, { params }) {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const blog = new Blog()
        const blogLike = new BlogLike()

        const newLike = await blogLike.create({
            blogSlug: params.slug,
            userId: session.user.id || session.user.email
        })

        if (!newLike) {
            return NextResponse.json(
                { success: false, message: 'Already liked' },
                { status: 400 }
            )
        }

        await blog.incrementLikes(params.slug)

        return NextResponse.json({
            success: true,
            message: 'Blog liked successfully'
        })
    } catch (error) {
        console.error('Like error:', error)
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession()

        if (!session) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const blog = new Blog()
        const blogLike = new BlogLike()

        const result = await blogLike.delete(params.slug, session.user.id || session.user.email)

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Like not found' },
                { status: 404 }
            )
        }

        await blog.decrementLikes(params.slug)

        return NextResponse.json({
            success: true,
            message: 'Like removed successfully'
        })
    } catch (error) {
        console.error('Unlike error:', error)
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}