// import request from '../utils/request'
import { request } from '@/plugins/request'

export const login = (data) => request({method: 'post', url: '/api/users/login', data})

export const getUser = () => request({method: 'get', url: '/api/user'})

export const updateUser = (data) => request({method: 'put', url: '/api/user', data})

export const register = (data) => request({method: 'post', url: '/api/users', data})

export const getArticles = params => request({method: 'get', url: '/api/articles', params})

export const updateArticles = (slug, data) => request({method: 'put', url: `/api/articles/${slug}`, data})

export const deleteArticles = slug => request({method: 'delete', url: `/api/articles/${slug}`})

export const publishArticles = data => request({method: 'post', url: '/api/articles', data})

export const getArticle = slug => request({method: 'get', url: `/api/articles/${slug}`})

export const getComments = slug => request({method: 'get', url: `/api/articles/${slug}/comments`})

export const addComments = (slug, data) => request({method: 'post', url: `/api/articles/${slug}/comments`, data})

export const deleteComments = ({slug, id}) => request({method: 'delete', url: `/api/articles/${slug}/comments/${id}`})

export const getTags = () => request({method: 'get', url: '/api/tags'})

export const getYourFeedArticle = params => request({method: 'get', url: '/api/articles/feed', params})

export const addFavorite = slug => request({method: 'post', url: `/api/articles/${slug}/favorite`})

export const deleteFavorite = slug => request({method: 'delete', url: `/api/articles/${slug}/favorite`})
