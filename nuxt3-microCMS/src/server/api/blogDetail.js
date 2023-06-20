import client from './client'

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    const slug = params.slug
    const data = client.getListDetail({
        endpoint: 'blogs',
        contentId: String(slug),
    })
    return data
})