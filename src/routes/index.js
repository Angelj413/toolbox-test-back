import express from 'express'
import {
  getFiles,
  getFileNames,
  getUnparsedFiles,
  findFileByName
} from '../controllers/files/index.js'
import { query } from 'express-validator'
const router = express.Router()

/**
 * @swagger
 * /files/data:
 *   get:
 *     summary: Get files data
 *     description: Retrieve files data from the server
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: The name of the file to search for OPTIONAL
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/files/data', query('fileName').isString(), async (req, res) => {
  const { fileName } = req.query
  if (fileName) return res.send(await findFileByName(fileName))
  res.send(await getFiles())
})

/**
 * @swagger
 * /files/names:
 *   get:
 *     summary: Get file names
 *     description: Retrieve the names of all files
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.get('/files/names', async (req, res) => {
  res.send(await getFileNames())
})

/**
 * @swagger
 * /files/list:
 *   get:
 *     summary: Get unparsed files
 *     description: Retrieve a list of all unparsed files, exactly like external API response
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.get('/files/list', async (req, res) => {
  res.send(await getUnparsedFiles())
})

export default router
