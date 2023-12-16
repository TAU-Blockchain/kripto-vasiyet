/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Check
 *     summary: Get registered and alive users.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   tc_no:
 *                     type: string
 *       '403':
 *         description: Invalid API key.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
