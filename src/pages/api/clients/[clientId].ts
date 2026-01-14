import type { APIRoute } from "astro"
import { prisma } from "../../../db"

export const prerender = false

async function findClientById(clientId: string) {
    try {

        const client = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })

        return client

    } catch (error) {
        console.log(error)
        return null
    }
}

export const GET: APIRoute = async ({ params }) => {

    const { clientId = "" } = params

    try {
        const client = await findClientById(clientId)

        if (!client) {
            return new Response(
                JSON.stringify({ method: "GET", msg: "No se encontró el cliente con id: " + clientId }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }

        return new Response(
            JSON.stringify({ method: "GET", msg: "ok, received", client }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ method: "GET", msg: "Error, trying to get", error }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

}

export const PUT: APIRoute = async ({ params, request }) => {

    const { clientId } = params

    try {
        const { id, ...body } = await request.json()

        if (!body) {
            throw new Error("No se recibió la data para la actualización.")
        }

        const updatedClient = await prisma.client.update({
            where: {
                id: clientId
            },
            data: { ...body }
        })

        return new Response(
            JSON.stringify({ method: "PUT", msg: "ok, updated", updatedClient }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ method: "PUT", msg: "Error, trying to update", error }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

}

export const PATCH: APIRoute = async ({ params, request }) => {

    const { clientId } = params

    try {
        const { id, ...body } = await request.json()

        if (!body) {
            throw new Error("No se recibió la data para la actualización.")
        }

        const updatedClient = await prisma.client.update({
            where: {
                id: clientId
            },
            data: { ...body }
        })

        return new Response(
            JSON.stringify({ method: "PATCH", msg: "Row has been updated!", updatedClient }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ method: "PATCH", msg: "Error, trying to update", error }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

}

export const DELETE: APIRoute = async ({ params, request }) => {

    const { clientId = "" } = params

    try {
        const deletedClient = await prisma.client.delete({
            where: {
                id: clientId
            }
        })

        return new Response(
            JSON.stringify({ method: "DELETE", msg: "Row has been deleted!", deletedClient }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({
                method: "DELETE",
                msg: "Ocurrió un error al intentar eliminar el cliente.",
                error
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

}