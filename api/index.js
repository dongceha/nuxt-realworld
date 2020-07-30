// import request from '../utils/request'
import { request } from '@/plugins/request'

export const login = (data) => request({method: 'post', url: '/api/users/login', data})

export const register = (data) => request({method: 'post', url: '/api/users', data})

export const getArticles = params => request({method: 'get', url: '/api/articles', params})

export const getArticle = slug => request({method: 'get', url: `/api/articles/${slug}`})

export const getTags = () => request({method: 'get', url: '/api/tags'})

export const getYourFeedArticle = params => request({method: 'get', url: '/api/articles/feed', params})

export const addFavorite = slug => request({method: 'post', url: `/api/articles/${slug}/favorite`})

export const deleteFavorite = slug => request({method: 'delete', url: `/api/articles/${slug}/favorite`})
