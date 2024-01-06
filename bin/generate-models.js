#!env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const SequelizeAuto = require('sequelize-auto')
const { execSync } = require('child_process')
const sequelizerc = require('../.sequelizerc')
const sqlTables = require('../config/sqlTables')

const directory = sequelizerc['models-path']
const {
  username, password, database, host, port, dialect
} = require(sequelizerc.config)

const config = {
  host,
  dialect,
  directory,
  port,
  caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
  singularize: false,
  additional: {
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
  },
  // skipTables: [migrationStorageTableName, seederStorageTableName],
  logging: false,
}

const main = async () => {
  config.tables = sqlTables

  const files = fs.readdirSync(directory)
  files.forEach(file => {
    if (file === 'index.js' || file === 'package.json') return
    fs.unlinkSync(path.join(directory, file))
  })

  const sequelizeAuto = new SequelizeAuto(database, username, password, config)
  // eslint-disable-next-line no-unused-vars
  sequelizeAuto.run().then((data) => {
    const Tables = Object.keys(data.tables).map(table => table.split(/\./).slice(-1)[0]);

    if (sqlTables.length) {
      for (const i in sqlTables) {
        const table = sqlTables[i];
        const shouldToGenerate = Tables.indexOf(table) > -1;
        const model = path.join(directory, `${table}.js`)

        console.log(`${shouldToGenerate ? 'Generating' : 'Deleting'} src/sql-model/${table}.js`)
        if (!shouldToGenerate) {
          try {
            fs.unlinkSync(model)
          } catch (e) {
            if (e.code !== 'ENOENT') throw e;
          }
          continue;
        }

        let content = fs.readFileSync(model)
        content = content.toString().replace(/"\(N/g, '"')
        fs.writeFileSync(model, content)
      }
      const formating = execSync(`npx eslint --fix ${directory} --no-ignore`)
      console.log(formating.toString())
      fs.writeFileSync(path.join(directory, '.gitkeep'), '')
    } else {
      fs.writeFileSync(
        path.join(directory, 'init-models.js'),
        'module.exports = (sequelize) => {\n  return null\n}\n'
      )
    }
  })
}

main()
