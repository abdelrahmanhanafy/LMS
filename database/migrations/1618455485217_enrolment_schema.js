'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnrolmentSchema extends Schema {
  up () {
    this.create('enrolment', (table) => {
      table.integer('course_id').unsigned()
      table.integer('user_id').unsigned()
      table.foreign('course_id').references('courses.id').onDelete('cascade')
      table.foreign('user_id').references('users.id').onDelete('cascade')

    })
  }

  down () {
    this.drop('enrolment')
  }
}

module.exports = EnrolmentSchema
