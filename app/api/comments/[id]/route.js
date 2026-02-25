export async function PUT(request, { params }) {
    try {
        const body = await request.json()
        const comment = new Comment()

        const result = await comment.update(params.id, body)

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Comment not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Comment updated successfully'
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
        const comment = new Comment()
        const result = await comment.delete(params.id)

        return NextResponse.json({
            success: true,
            message: 'Comment deleted successfully'
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}