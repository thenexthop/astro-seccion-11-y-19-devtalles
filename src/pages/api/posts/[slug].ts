import type { APIRoute } from 'astro'
import { getEntry } from 'astro:content'

export const prerender = false

export const GET: APIRoute = async ({ params }) => {

    const { slug } = params

    const post = await getEntry("blog", slug as any)

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

export const POST: APIRoute = async ({ request }) => {

    const body = await request.json()

    if (!body) {
        return new Response(
            JSON.stringify({ error: "No data provided" }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    const resp = {
        method: "POST",
        ...body
    }

    return new Response(
        JSON.stringify(resp),
        {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        }
    )
}

export const PUT: APIRoute = async ({ request }) => {

    const body = await request.json()

    if (!body) {
        return new Response(
            JSON.stringify({ error: "No data provided" }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    const resp = {
        method: "PUT",
        ...body
    }

    return new Response(
        JSON.stringify(resp),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    )
}

export const DELETE: APIRoute = async ({ params }) => {

    const { slug } = params

    const resp = {
        method: "DELETE",
        slug
    }

    return new Response(
        JSON.stringify(resp),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    )
}