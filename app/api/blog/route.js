import { NextResponse } from 'next/server'
import { Blog } from '../models/Blog'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const published = searchParams.get('published')
        const category = searchParams.get('category')
        const search = searchParams.get('search')

        const blog = new Blog()
        const filters = {}

        if (published !== null) filters.published = published === 'true'
        if (category) filters.category = category
        if (search) filters.search = search

        const blogs = await blog.findAll(filters)

        return NextResponse.json({
            success: true,
            data: blogs
        })
    } catch (error) {
        console.error('Blog list error:', error)
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const blog = new Blog()

        const newBlog = await blog.create(body)

        return NextResponse.json({
            success: true,
            data: newBlog
        }, { status: 201 })
    } catch (error) {
        console.error('Blog creation error:', error)
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}