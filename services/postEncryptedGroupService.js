/**
 * PostEncryptedGroup Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models")
const { Op } = require("sequelize")

const postEncryptedGroupService = {}

/**
 * Get all encrypted group posts
 */
postEncryptedGroupService.getAll = async (limit, offset, order, searchKeyword, startDate, endDate) => {
  let query = {
    limit: limit,
    order: [
      ['id', order ? order.toUpperCase() : 'DESC'],
    ],
    offset: offset,
  }

  let opOrList = []

  // checking if startDate or endDate is true - we must have both true
  if (startDate && endDate) {
    opOrList.push({ created_at: { [Op.between]: [startDate, endDate] } })
  }

  // checking if we have a searchKeyword
  if (searchKeyword) {
    opOrList.push({ 'message': { [Op.iLike]: '%' + searchKeyword + '%' } })
    opOrList.push({ 'board': { [Op.iLike]: '%' + searchKeyword + '%' } })
  }

  // adding all statements together
  if (opOrList.length !== 0) {
    query.where = {
      [Op.or]: opOrList
    }
  }

  return models.PostEncryptedGroup.findAndCountAll(query)
}

/**
 * Get encrypted group post by tx_hash
 */
postEncryptedGroupService.getEncryptedGroupPostByTxHash = async (req) => {
  return models.PostEncryptedGroup.findOne({
    where: {
      tx_hash: req.params.tx_hash
    }
  })
}

/**
 * Get latest encrypted group posts
 */
postEncryptedGroupService.getLatest = async (limit, offset, order, searchKeyword, startDate, endDate) => {
  let query = {
    limit: limit,
    order: [
      ['id', order ? order.toUpperCase() : 'DESC'],
    ],
    offset: offset,
  }

  let opOrList = []

  // checking if startDate or endDate is true - we must have both true
  if (startDate && endDate) {
    opOrList.push({ qcreated_at: { [Op.between]: [startDate, endDate] } })
  }

  // checking if we have a searchKeyword
  if (searchKeyword) {
    opOrList.push({ 'message': { [Op.iLike]: '%' + searchKeyword + '%' } })
    opOrList.push({ 'board': { [Op.iLike]: '%' + searchKeyword + '%' } })
  }

  // adding all statements together
  if (opOrList.length !== 0) {
    query.where = {
      [Op.or]: opOrList
    }
  }

  return models.PostEncryptedGroup.findAndCountAll(query)
}

module.exports = postEncryptedGroupService
