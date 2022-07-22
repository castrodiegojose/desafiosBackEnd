const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './src/SqliteDB/mydb.sqlite'
    },
    useNullAsDefault: true

}

module.exports = {sqliteOptions}