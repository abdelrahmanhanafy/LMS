'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoursesSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.string('title')
      table.string('content')
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CoursesSchema
