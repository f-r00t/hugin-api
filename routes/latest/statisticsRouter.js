/**
 * Statistics routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../../controllers/latest/statisticsController')

// NOTE: the ordering here is important

/**
 * @openapi
 * /api/v2/statistics/posts/popular:
 *   get:
 *     description: Gets the most popular posts based on replies.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of posts (asc/desc)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of posts per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     tags:
 *       - statistics
 *     responses:
 *       200:
 *         description: Returns the most popular posts based on replies.
 */
router.get('/statistics/posts/popular', controller.getPopularPosts)

/**
 * @openapi
 * /api/v2/statistics/boards/popular:
 *   get:
 *     description: Gets the most popular boards based on posts.
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordering of boards (asc/desc)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The amount of boards per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     tags:
 *       - statistics
 *     responses:
 *       200:
 *         description: Returns the most popular boards based on posts.
 */
router.get('/statistics/boards/popular', controller.getPopularBoards)

module.exports = router
