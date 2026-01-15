import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const updatePostLikes = defineAction({
    input: z.object({
        postId: z.string(),
        likes: z.number(),
    }),
    handler: async ({ postId, likes }) => {

        let post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) {

            const newPost = {
                id: postId,
                title: "Post not found",
                likes: likes,
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
                likes: post.likes! + likes
            }
        })

        console.log("Post updated: ", updatedPost)

        return updatedPost
    }
})