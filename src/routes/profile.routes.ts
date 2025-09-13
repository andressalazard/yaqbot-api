import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';

const router = Router();

//PROFILE

/**
 * @swagger
 * /api/profile/{userid}:
 *   get:
 *     summary: Retrieve user's profile by Id
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user Id
 *     responses:
 *       200:
 *         description: A profile object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, user Id is required
 *       404:
 *         description: The Profile was not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userid', ProfileController.getProfileByUserId);

/**
 * @swagger
 * /api/profile/{userid}:
 *   post:
 *     summary: Creates user's profile
 *     description: Creates a brand new profile for the user passing on his userId
 *     tags:
 *       - Profile
 *     parameters:
 *       - name: userid
 *         in: path
 *         required: true
 *         description: User ID, necessary for profile creation
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterProfileData'
 *     responses:
 *       '201':
 *         description: User Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       '400':
 *         description: Bad request, user Id is required
 *       '404':
 *         description: User Not Found or User Profile already created
 *       '500':
 *         description: Internal server error
 */
router.post('/:userid', ProfileController.registerProfile);

/**
 * @swagger
 * /api/profile/{userid}:
 *   patch:
 *     summary: Updates user's profile
 *     description: Updates a user profile passing on his userId
 *     tags:
 *       - Profile
 *     parameters:
 *       - name: userid
 *         in: path
 *         required: true
 *         description: User ID, necessary for profile modification
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileData'
 *     responses:
 *       '201':
 *         description: User Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       '400':
 *         description: Bad request, user Id is required
 *       '404':
 *         description: User Not Found
 *       '500':
 *         description: Internal server error
 */
router.patch('/:userid', ProfileController.updateProfile);

export default router;
