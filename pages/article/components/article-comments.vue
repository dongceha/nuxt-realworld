<template>
  <div>
      <form class="card comment-form" @submit.prevent="addComments">
        <div class="card-block">
        <textarea v-model="commentT" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
            Post Comment
        </button>
        </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
        <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
        </div>
        <div class="card-footer">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: comment.author.username
            }
        }" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: comment.author.username
            }
        }" class="comment-author">{{comment.author.username}}</nuxt-link>
            <span class="date-posted">{{article.createAt | data('MMM DD, YYYY')}}</span>
            <span
                @click="deleteComments(comment)"
                class="mod-options"
                v-if="user.username === comment.author.username">
                <i class="ion-trash-a"></i>
            </span>
        </div>
    </div>
  </div>
</template>

<script>
import {
    getComments,
    addComments,
    deleteComments
} from '@/api'
export default {
    props: {
        article: {
            type: Object,
            required: true
        },
        user: {
            type: Object
        }
    },
    data() {
        return {
            comments: [],
            commentT: ''
        }
    },
    mounted() {
        this.getComments()
    },
    methods: {
        async getComments() {
            const {data} = await getComments(this.article.slug)
            this.comments = data.comments
        },
        addComments() {
            addComments(this.article.slug, {
                comment: {
                    body: this.commentT
                }
            }).then(() => {
                this.commentT = ''
                this.getComments()
            })
        },
        deleteComments(comment) {
            deleteComments({
                slug: this.article.slug,
                id: comment.id
            }).then(() => {
                this.getComments()
            })
        }
    }
}
</script>

<style>

</style>