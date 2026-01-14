import type { APIRoute } from 'astro'
import { prisma } from '@/db'

export const prerender = false

export const GET: APIRoute = async ({ params }) => {
    const { id = "" } = params

    try {
        let post = await prisma.post.findUnique({
            where: {
                id,
            }
        })

        if (!post) {

            post = {
                id,
                title: "Post not found",
                likes: 0,
            }

            return new Response(
                JSON.stringify(post),
                {
                    status: 200,
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

    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: `Error al intentar obtener los likes del post ${id}` }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }
}

export const PUT: APIRoute = async ({ params, request }) => {
    const { id = "" } = params

    try {

        const { likes = 0 } = await request.json()

        let post = await prisma.post.findUnique({
            where: {
                id,
            },
        })

        if (!post) {

            const newPost = {
                id,
                title: "Post not found",
                likes: 0,
            }

            post = await prisma.post.create({
                data: newPost,
            })
        }

        post.likes = post.likes + likes

        const updatedPost = await prisma.post.update({
            where: {
                id,
            },
            data: post,
        })

        return new Response(
            JSON.stringify(updatedPost),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        )

    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: `Error al intentar incrementar los likes del post ${id}` }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

}