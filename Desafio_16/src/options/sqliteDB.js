import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const mybase = path.join(__dirname, '../SqliteDB/mydb.sqlite');

export const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: mybase
    },
    useNullAsDefault: true

}
