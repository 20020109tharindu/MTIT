const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - restaurantId
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         name:
 *           type: string
 *           example: Margherita Pizza
 *         description:
 *           type: string
 *           example: Classic tomato and mozzarella pizza
 *         price:
 *           type: number
 *           example: 12.99
 *         category:
 *           type: string
 *           example: Pizza
 *         restaurantId:
 *           type: string
 *           example: 664f1b2c9a4e2d001f3c8a10
 *         isAvailable:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items (optionally filter by restaurantId)
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         schema:
 *           type: string
 *         description: Filter items by restaurant ID
 *     responses:
 *       200:
 *         description: List of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Server error
 */
router.get('/', getAllMenuItems);

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Get a menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getMenuItemById);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *               - restaurantId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Margherita Pizza
 *               description:
 *                 type: string
 *                 example: Classic tomato and mozzarella pizza
 *               price:
 *                 type: number
 *                 example: 12.99
 *               category:
 *                 type: string
 *                 example: Pizza
 *               restaurantId:
 *                 type: string
 *                 example: 664f1b2c9a4e2d001f3c8a10
 *               isAvailable:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Menu item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Validation error
 */
router.post('/', createMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Menu item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: Menu item not found
 *       400:
 *         description: Validation error
 */
router.put('/:id', updateMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteMenuItem);

module.exports = router;