import { actions, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { prisma } from '@/db'

// Mi version
export const updatePostLikes = defineAction({
    input: z.object({
        postId: z.string(),
        increment: z.number(),
    }),
    handler: async ({ postId, increment }) => {

        let post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) {

            const newPost = {
                id: postId,
                title: "Post not found",
                likes: increment,
            }

            post = await prisma.post.create({
                data: newPost,
            })
        }


        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likes: post.likes + increment
            }
        })

        console.log("Post updated: ", updatedPost)

        return updatedPost
    }
})

// La version de Fernando Herrera (DevTalles)
// para esta se requiere extender la accion que obtiene los likes
// agregandole un campo booleano para indicar si el post existe
export const updatePostLikesV2 = defineAction({
    input: z.object({
        postId: z.string(),
        increment: z.number(),
    }),
    handler: async ({ postId, increment }) => {

        const { data, error } = await actions.getPostLikes(postId)

        if (error) {
            console.log(error)
            throw new Error("Ocurrió un error al intentar obtener los likes")
        }

        const { exists, likes = 0 } = data

        if (!exists) {
            const newPost = {
                id: postId,
                title: "Post not found",
                likes: increment,
            }

            const post = await prisma.post.create({
                data: newPost,
            })

            return post
        }

        const postUpdated = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likes: likes + increment
            }
        })

        return postUpdated
    }
})