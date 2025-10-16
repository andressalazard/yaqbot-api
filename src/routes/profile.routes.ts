import { Router } from 'express';
import multer from 'multer';
import storage from '../middlewares/multerStorage.middleware';
import { ProfileController } from '../controllers/profile.controller';
import { validateImage } from '../middlewares/validateImage.middleware';

const router = Router();
const uploadCloudinary = multer({ storage });

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
 *           format: uuid
 *         required: true
 *         description: The user Id
 *     responses:
 *       200:
 *         description: A profile object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
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
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       '201':
 *         description: User Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
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
 *               $ref: '#/components/schemas/Profile'
 *       '400':
 *         description: Bad request, user Id is required
 *       '404':
 *         description: User Not Found
 *       '500':
 *         description: Internal server error
 */
router.patch('/:userid', ProfileController.updateProfile);

/**
 * @swagger
 * /api/profile/photo/{userid}:
 *   patch:
 *     summary: Updates user's profile photo
 *     description: Updates a user avatar photo passing on his userId
 *     tags:
 *       - Profile
 *     consumes:
 *       - multipart/form-data
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: User Profile Photo updated successfully
 *       '400':
 *         description: Bad request, user Id is required
 *       '404':
 *         description: File Image Not Found
 *       '500':
 *         description: Internal server error
 */
router.patch(
  '/photo/:userid',
  uploadCloudinary.single('file'),
  ProfileController.updateProfilePhoto
);

export default router;
