import type { APIRoute } from 'astro'
import { getCollection, getEntry } from 'astro:content';
import { prisma } from '../../../db'

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {

    const url = new URL(request.url)
    const slug = url.searchParams.get("slug")

    if (slug) {
        const post = await getEntry("blog", slug)

        if (!post) {
            return new Response(
                JSON.stringify({ error: `Post ${slug} not found` }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }

        return new Response(
            JSON.stringify(post),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    const blogPosts = await getCollection("blog")

    const posts = blogPosts.map((post) => {
        return {
            id: post.id,
            title: post.data.title,
            post: post.data,
            slug: post.id,
        }
    })

    return new Response(
        JSON.stringify(posts),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    )
}
