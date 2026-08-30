import { MongoClient } from 'mongodb'

let cachedClient = null
let cachedDb = null

export async function getDb() {
  if (cachedDb) {
    return cachedDb
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  const client = new MongoClient(uri)
  await client.connect()
  
  cachedClient = client
  cachedDb = client.db()
  
  return cachedDb
}

export async function closeDb() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}
