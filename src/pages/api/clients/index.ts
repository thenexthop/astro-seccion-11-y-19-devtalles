import type { APIRoute } from 'astro'
import { prisma } from '../../../db'
import { v4 as UUID } from 'uuid'

export const prerender = false

export const GET: APIRoute = async () => {

    try {
        const clients = await prisma.client.findMany()

        return new Response(
            JSON.stringify({ method: "GET", msg: "ok", clients }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            })

    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ method: "GET", msg: "Error, trying to get clients." }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }
}

export const POST: APIRoute = async ({ request }) => {

    try {
        const { id, ...body } = await request.json()

        const newClient = await prisma.client.create({
            data: {
                id: UUID(),
                ...body
            }
        })

        return new Response(
            JSON.stringify({ method: "POST", msg: "ok created", newClient }),
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            }
        )

    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ method: "POST", msg: "Error, trying to create a client." }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

}