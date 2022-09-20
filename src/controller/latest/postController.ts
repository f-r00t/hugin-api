/**
 * Post Controller
 */

'use strict'

import log from "loglevel";
import { Request, Response } from "express";

import { getAll, getByTxHash, getLatest, getAllRepliesOfPost } from "../../service/postService";
import { getTimestamp, convertUnixToDateTime, convertDateTimeToUnix } from "../../util/time";
import { getPagination, getPagingData } from "../../util/pagination";

/**
 * Get all posts
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
async function getAllPosts(req: Request, res: Response) {
    let { page, size, order, search, startDate, endDate, excludeAvatar } = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size))

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(Number(startDate))
    const endDateParam = convertUnixToDateTime(Number(startDate))
    const excludeAvatarParam = (excludeAvatar === "true");

    getAll(limit, offset, String(order), String(search), startDateParam, endDateParam, excludeAvatarParam)
        .then(async data => {
          // converts the standard UTC to unix timestamp
          for (const row of data.rows) {
            row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
            row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
            row.dataValues.replies = await getAllRepliesOfPost(row.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
          }

          const response = await getPagingData(data, Number(page), limit)
          log.info(getTimestamp() + ' INFO: Successful response.')
          res.json(response)

        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get a specific posts by tx_hash
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
 async function getPostByTxHash(req: Request, res: Response) {
    getByTxHash(req)
        .then(async data => {
            log.info(getTimestamp() + ' INFO: Successful response.')

            // send empty object if we can not find the post
            if (data === null) {
                res.status(404).json({})
            } else {
                // converts the standard UTC to unix timestamp
                data.dataValues.createdAt = convertDateTimeToUnix(data.dataValues.createdAt)
                data.dataValues.updatedAt = convertDateTimeToUnix(data.dataValues.updatedAt)
                data.dataValues.replies = await getAllRepliesOfPost(data.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
                res.json(data)
            }
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

/**
 * Get latest posts
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
 async function getLatestPosts(req: Request, res: Response) {
    let { page, size, order, search, startDate, endDate, excludeAvatar } = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size))

    // converts to datetime format since it's stored in the db as such
    const startDateParam = convertUnixToDateTime(Number(startDate))
    const endDateParam = convertUnixToDateTime(Number(endDate))
    const excludeAvatarParam = (excludeAvatar === "true");

    getLatest(limit, offset, String(order), String(search), startDateParam, endDateParam, excludeAvatarParam)
      .then(async data => {
          // converts the standard UTC to unix timestamp
          for (const row of data.rows) {
            row.dataValues.createdAt = convertDateTimeToUnix(row.dataValues.createdAt)
            row.dataValues.updatedAt = convertDateTimeToUnix(row.dataValues.updatedAt)
            row.dataValues.replies = await getAllRepliesOfPost(row.dataValues.tx_hash).then(replies => replies.map(reply => reply.tx_hash))
          }

          const response = await getPagingData(data, Number(page), limit)
          log.info(getTimestamp() + ' INFO: Successful response.')
          res.json(response)
        })
        .catch(err => {
            log.error(getTimestamp() + ' ERROR: Some error occurred while retrieving data. ' + err)
            res.status(400).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

export {
    getAllPosts,
    getPostByTxHash,
    getLatestPosts
};