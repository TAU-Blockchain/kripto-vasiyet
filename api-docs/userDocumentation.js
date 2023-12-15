/**
 * @swagger
 * /user/addDummy:
 *   get:
 *     tags:
 *       - User
 *     summary: Add dummy user data.
 *     responses:
 *       '200':
 *         description: Dummy datas added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
 * /kill/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Set isAlive value to 1 for the specified user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /revive/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Set isAlive value to 0 for the specified user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /isAlive/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get the isAlive status for the specified user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
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
 *                 error:
 *                   type: string
 */
