import clientPromise from '../lib/mongodb.js'
import { ObjectId } from 'mongodb'

export class Blog {
    constructor() {
        this.collectionName = 'blogs'
    }

    async getCollection() {
        const client = await clientPromise
        const db = client.db('gam_dashboard')
        return db.collection(this.collectionName)
    }

    async create(blogData) {
        const collection = await this.getCollection()
        const newBlog = {
            ...blogData,
            slug: this.generateSlug(blogData.title),
            views: 0,
            likes: 0,
            commentsCount: 0,
            published: blogData.published || false,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const result = await collection.insertOne(newBlog)
        return { ...newBlog, _id: result.insertedId }
    }

    async findAll(filters = {}) {
        const collection = await this.getCollection()
        const query = {}

        if (filters.published !== undefined) {
            query.published = filters.published
        }

        if (filters.category) {
            query.category = filters.category
        }

        if (filters.search) {
            query.$or = [
                { title: { $regex: filters.search, $options: 'i' } },
                { excerpt: { $regex: filters.search, $options: 'i' } }
            ]
        }

        const blogs = await collection
            .find(query)
            .sort({ createdAt: -1 })
            .toArray()

        return blogs
    }

    async findById(id) {
        const collection = await this.getCollection()
        return await collection.findOne({ _id: new ObjectId(id) })
    }

    async findBySlug(slug) {
        const collection = await this.getCollection()
        return await collection.findOne({ slug })
    }

    async update(id, updateData) {
        const collection = await this.getCollection()

        if (updateData.title) {
            updateData.slug = this.generateSlug(updateData.title)
        }

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
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        return result
    }

    async incrementViews(slug) {
        const collection = await this.getCollection()
        return await collection.updateOne(
            { slug },
            { $inc: { views: 1 } }
        )
    }

    async incrementLikes(slug) {
        const collection = await this.getCollection()
        return await collection.updateOne(
            { slug },
            { $inc: { likes: 1 } }
        )
    }

    async decrementLikes(slug) {
        const collection = await this.getCollection()
        return await collection.updateOne(
            { slug },
            { $inc: { likes: -1 } }
        )
    }

    async updateCommentsCount(slug, increment = 1) {
        const collection = await this.getCollection()
        return await collection.updateOne(
            { slug },
            { $inc: { commentsCount: increment } }
        )
    }

    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim()
    }
}