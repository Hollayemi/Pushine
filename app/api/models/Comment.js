import clientPromise from '../lib/mongodb.js'
import { ObjectId } from 'mongodb'

export class Comment {
    constructor() {
        this.collectionName = 'comments'
    }

    async getCollection() {
        const client = await clientPromise
        const db = client.db('gam_dashboard')
        return db.collection(this.collectionName)
    }

    async create(commentData) {
        const collection = await this.getCollection()
        const newComment = {
            ...commentData,
            likes: 0,
            replies: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const result = await collection.insertOne(newComment)
        return { ...newComment, _id: result.insertedId }
    }

    async findByBlogSlug(blogSlug) {
        const collection = await this.getCollection()
        const comments = await collection
            .find({
                blogSlug,
                parentId: null // Only top-level comments
            })
            .sort({ createdAt: -1 })
            .toArray()

        // Get replies for each comment
        for (let comment of comments) {
            comment.replies = await this.getReplies(comment._id.toString())
        }

        return comments
    }

    async getReplies(parentId) {
        const collection = await this.getCollection()
        const replies = await collection
            .find({ parentId })
            .sort({ createdAt: 1 })
            .toArray()

        // Recursively get nested replies
        for (let reply of replies) {
            reply.replies = await this.getReplies(reply._id.toString())
        }

        return replies
    }

    async findById(id) {
        const collection = await this.getCollection()
        return await collection.findOne({ _id: new ObjectId(id) })
    }

    async update(id, updateData) {
        const collection = await this.getCollection()
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...updateData,
                    updatedAt: new Date()
                }
            }
        )
        return result
    }

    async delete(id) {
        const collection = await this.getCollection()
        // Delete the comment and all its replies
        await this.deleteRepliesRecursive(id)
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        return result
    }

    async deleteRepliesRecursive(parentId) {
        const collection = await this.getCollection()
        const replies = await collection.find({ parentId: parentId.toString() }).toArray()

        for (let reply of replies) {
            await this.deleteRepliesRecursive(reply._id)
            await collection.deleteOne({ _id: reply._id })
        }
    }

    async incrementLikes(id) {
        const collection = await this.getCollection()
        return await collection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { likes: 1 } }
        )
    }
}