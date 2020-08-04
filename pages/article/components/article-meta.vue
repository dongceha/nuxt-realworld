<template>
  <div class="article-meta">
    <nuxt-link :to="{
        name: 'profile',
        params: {
            username: article.author.username
        }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: article.author.username
            }
        }" class="author">{{article.author.username}}</nuxt-link>
        <span class="date">{{article.createAt | data('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="!isAuthor">
        <button
            @click="handleFollow"
            :class="{active: article.author.following}"
            class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{article.author.following ? 'Follow' : 'unFollow'}}
            {{article.author.username}}
        </button>
        &nbsp;&nbsp;
        <button
            :class="{active: article.favorited}"
            @click="handleFavorite"
            class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            {{article.favorited ? 'unFavorite' : 'Favorite'}}  Post <span class="counter">(29)</span>
        </button>
    </template>
    <template v-else>
        <nuxt-link
            :to="{
                name: 'edits',
                query: {
                    slug: article.slug
                }
            }"
            class="btn btn-sm btn-outline-secondary btn-sm">
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
        </nuxt-link>
        &nbsp;&nbsp;
        <button
            @click="handleDelete"
            class="btn btn-outline-danger btn-sm">
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
        </button>
    </template>
    
  </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            required: true
        },
        isAuthor: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        handleDelete() {
            this.$emit('handleDelete')
        },
        handleFollow() {
            this.$emit('handleFollow')
        },
        handleFavorite() {
            this.$emit('handleFavorite')
        }
    }
}
</script>

<style>

</style>