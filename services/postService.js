/**
 * Post Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models")
const { Sequelize, Op } = require("sequelize")

const postService = {}

/**
 * Get all posts
 */
postService.getAll = async (limit, offset, order, searchKeyword, startDate, endDate, excludeAvatar) => {
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

    // don't return avatar column if true
    if (excludeAvatar) {
      query.attributes = {
        exclude: ['avatar'],
      }
    }

    return models.Post.findAndCountAll(query)
}

/**
 * Get post by tx_hash
 */
postService.getPostByTxHash = async (req) => {
    return models.Post.findOne({
        where: {
            tx_hash: req.params.tx_hash
        }
    })
}

/**
 * Get latest posts
 */
postService.getLatest = async (limit, offset, order, searchKeyword, startDate, endDate, excludeAvatar) => {
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

    // don't return avatar column if true
    if (excludeAvatar) {
      query.attributes = {
        exclude: ['avatar'],
      }
    }

    return models.Post.findAndCountAll(query)
}

/**
 * Get replies of a post
 */
postService.getAllRepliesOfPost = async (txHash) => {
  return models.Post.findAll({
    attributes: ['tx_hash'],
    where: {
      reply: txHash
    },
    raw: true
  })
}

/**
 * Get all popular posts based on replies
 */
postService.getPopularPosts = async () => {
  return models.Post.findAll({
    attributes: [[Sequelize.literal('COUNT(*)'), 'replies'], ['reply', 'post']],
    where: {
      reply: {
        [Op.ne]: null
      }
    },
    group: 'reply',
    raw: true
  })
}

module.exports = postService
