// src/lib/database.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

export interface Todo {
  id: string
  title: string
  content?: string | null
  completed: boolean
  created_at: Date
  updated_at: Date
}

export class TodoDatabase {
  // 全てのTodoを取得
  static async getAll(): Promise<Todo[]> {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT * FROM todos ORDER BY created_at DESC'
      )
      return result.rows
    } finally {
      client.release()
    }
  }

  // Todoを作成
  static async create(title: string, content?: string): Promise<Todo> {
    const client = await pool.connect()
    try {
      const result = await client.query(
        `INSERT INTO todos (id, title, content, completed, created_at, updated_at) 
         VALUES (gen_random_uuid(), $1, $2, false, NOW(), NOW()) 
         RETURNING *`,
        [title, content || null]
      )
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  // Todoを更新
  static async update(
    id: string, 
    updates: { title?: string; content?: string; completed?: boolean }
  ): Promise<Todo | null> {
    const client = await pool.connect()
    try {
      // 動的にSETクエリを構築
      const setClause = []
      const values = []
      let paramCount = 1

      if (updates.title !== undefined) {
        setClause.push(`title = $${paramCount}`)
        values.push(updates.title)
        paramCount++
      }
      if (updates.content !== undefined) {
        setClause.push(`content = $${paramCount}`)
        values.push(updates.content)
        paramCount++
      }
      if (updates.completed !== undefined) {
        setClause.push(`completed = $${paramCount}`)
        values.push(updates.completed)
        paramCount++
      }

      if (setClause.length === 0) {
        throw new Error('No fields to update')
      }

      setClause.push(`updated_at = NOW()`)
      values.push(id)

      const query = `
        UPDATE todos 
        SET ${setClause.join(', ')} 
        WHERE id = $${paramCount} 
        RETURNING *
      `

      const result = await client.query(query, values)
      return result.rows[0] || null
    } finally {
      client.release()
    }
  }

  // Todoを削除
  static async delete(id: string): Promise<boolean> {
    const client = await pool.connect()
    try {
      const result = await client.query('DELETE FROM todos WHERE id = $1', [id])
      return result.rowCount ? result.rowCount > 0 : false
    } finally {
      client.release()
    }
  }

  // IDでTodoを取得
  static async getById(id: string): Promise<Todo | null> {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM todos WHERE id = $1', [id])
      return result.rows[0] || null
    } finally {
      client.release()
    }
  }
}