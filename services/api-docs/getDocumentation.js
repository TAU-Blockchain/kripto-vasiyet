/**
 * @swagger
 * /get/user/{id}:
 *   get:
 *     tags:
 *       - Get
 *     summary: Get user data by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       '400':
 *         description: Invalid parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: An error occurred during the operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /get/user-all:
 *   get:
 *     tags:
 *       - Get
 *     summary: Get all user data.
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *       '500':
 *         description: An error occurred during the operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /get/user-by-type/{type}/{value}:
 *   get:
 *     tags:
 *       - Get
 *     summary: Get user data by type and value.
 *     parameters:
 *       - name: type
 *         in: path
 *         description: Type of the parameter.
 *         required: true
 *         schema:
 *           type: string
 *       - name: value
 *         in: path
 *         description: Value of the parameter.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *       '500':
 *         description: An error occurred during the operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
