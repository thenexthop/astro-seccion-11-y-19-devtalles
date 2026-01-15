<template>
    <div v-if="isLoading">
        <span>Loading...</span>
    </div>

    <button v-else-if="totalLikes === 0" @click="handleLikeBtn">
        <span>👍 Be the first to like this post </span>
    </button>

    <button v-else @click="handleLikeBtn">
        <span>👍 Like this post </span>
        <span>{{ totalLikes }}</span>
    </button>
</template>

<script lang="ts" setup>
    import { actions } from 'astro:actions'
    import { ref, watch } from 'vue'
    import confetti from 'canvas-confetti'
    import debounce from 'lodash.debounce'

    interface Props {
        postId: string;
    }

    const props = defineProps<Props>()

    const handleLikeBtn = () => {
        
        likesClicked.value++
        totalLikes.value++

        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        })
    }

    const totalLikes = ref(0)
    const likesClicked = ref(0)
    const isLoading = ref(true)

    watch(totalLikes, debounce(async () => {
        console.log("Veces Clicked: ", likesClicked.value)

        likesClicked.value > 0 && await actions.updatePostLikes({
            postId: props.postId,
            increment: likesClicked.value
        })

        likesClicked.value = 0

    }, 500))

    const getLikes = async () => {
        
        const { data, error } = await actions.getPostLikes(props.postId)
        
        if (error) {
            console.log(error)
            return
        }
            
        totalLikes.value = data.likes ?? 0
        isLoading.value = false
    }

    getLikes()

</script>

<style scoped>
    button {
     background-color: #5e51bc;
     color: #fff;
     padding: 10px 20px;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     transition: all 0.3s ease;

     &:hover {
        background-color: #4a3f9a;
     }
    }

</style>

 