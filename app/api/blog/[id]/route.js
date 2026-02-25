import { NextResponse } from 'next/server'
import { Blog } from '../../models/Blog'

export async function GET(request, { params }) {
    try {
        const blog = new Blog()
        const post = await blog.findById(params.id)

        if (!post) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: post
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}

export async function PUT(request, { params }) {
    try {
        const body = await request.json()
        const blog = new Blog()

        const result = await blog.update(params.id, body)

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Blog updated successfully'
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}

export async function DELETE(request, { params }) {
    try {
        const blog = new Blog()
        const result = await blog.delete(params.id)

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Blog not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}
