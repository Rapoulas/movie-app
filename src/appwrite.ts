import { Client, ID, Query, TablesDB } from "appwrite"

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID

const client = new Client().setEndpoint('https://nyc.cloud.appwrite.io/v1').setProject(PROJECT_ID)
const database = new TablesDB(client)

export const updateSearchCount = async (searchTerm : string, movie: any) => {
  try {
    const result = await database.listRows(DATABASE_ID, COLLECTION_ID,[
      Query.equal('searchTerm', searchTerm)
    ])

    if (result.rows.length > 0) {
      const doc = result.rows[0]

      await database.updateRow(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1
      })
    } else {
      await database.createRow(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      })
    }
  } catch (error) {
    console.error('Error updating search count:', error)
  }
}