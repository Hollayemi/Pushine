import clientPromise from '../lib/mongodb.js'
import { ObjectId } from 'mongodb'

export class BlogLike {
    constructor() {
        this.collectionName = 'blog_likes'
    }

    async getCollection() {
        const client = await clientPromise
        const db = client.db('gam_dashboard')
        return db.collection(this.collectionName)
    }

    async create(likeData) {
        const collection = await this.getCollection()

        // Check if already liked
        const existing = await collection.findOne({
            blogSlug: likeData.blogSlug,
            userId: likeData.userId
        })

        if (existing) {
            return null // Already liked
        }

        const newLike = {
            ...likeData,
            createdAt: new Date()
        }

        const result = await collection.insertOne(newLike)
        return { ...newLike, _id: result.insertedId }
    }

    async hasUserLiked(blogSlug, userId) {
        const collection = await this.getCollection()
        const like = await collection.findOne({ blogSlug, userId })
        return !!like
    }

    async delete(blogSlug, userId) {
        const collection = await this.getCollection()
        const result = await collection.deleteOne({ blogSlug, userId })
        return result
    }

    async getLikesCount(blogSlug) {
        const collection = await this.getCollection()
        return await collection.countDocuments({ blogSlug })
    }
}