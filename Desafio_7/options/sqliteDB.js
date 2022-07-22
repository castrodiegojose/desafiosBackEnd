const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './SqliteDB/mydb.sqlite'
    },
    useNullAsDefault: true

}

module.exports = {sqliteOptions}