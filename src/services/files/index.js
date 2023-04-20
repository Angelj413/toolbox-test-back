import axios from 'axios'

import { API_KEY } from '../../config/api.js'
import { apiResources } from '../../constants/resources.js'
import logger from '../../utils/logger/index.js'

// Set the headers for the request
const headers = {
  Authorization: `Bearer ${API_KEY}`
}

// Export the files names and the files objects
export let filesNames = []

//  {file: {file: string, lines: Array}}
export const filesObjects = {}

export let rawUnparsedFiles

/**
 *
 * @returns {Promise} Promise object represents the data from external API
 */
const getFiles = async () => {
  try {
    const { data } = await axios.get(apiResources.files, { headers })
    rawUnparsedFiles = data
    filesNames = [...data.files]
    return data
  } catch (error) {
    logger.error('[FILES SERVICES][getFiles] ERROR: ', error)
    throw new Error('Failed to fetch data from external API')
  }
}

/**
 *
 * @param {string} name
 * @returns {Promise} Promise object represents the data from external API for a specific file
 */
const getFile = async (name) => {
  try {
    const { data } = await axios.get(`${apiResources.file}/${name}`, {
      headers
    })
    return parseStringToObjectArray(data)
  } catch (error) {
    logger.warn(`[FILES SERVICES][getFile] name: ${name} ERROR: `, error)
    throw new Error('Failed to fetch data from external API')
  }
}

/**
 *
 * @param {string} str
 * @returns {Array} Array of objects  [{text: string, number: number, hex: string}]
 */
const parseStringToObjectArray = (str) => {
  const lines = str.split('\n').slice(1) // Split the string into lines and ignore the first line
  const objectArray = []
  lines.forEach((line) => {
    console.log('line: ', line)
    const values = line.split(',')
    if (values.length < 4) return
    if (values.find((value) => value === '') === '') return
    const [, text, number, hex] = values
    console.log('Number(number.trim()): ', number)
    const obj = {
      text,
      number,
      hex
    }
    objectArray.push(obj)
  })
  return objectArray
}

/**
 *
 * @param {string} file
 * @returns {Promise} Promise object represents the data from external API for a specific file
 */
const buildFilesObjects = async (file) => {
  try {
    const lines = await getFile(file)
    filesObjects[file] = {
      file,
      lines
    }
    return
  } catch (error) {
    logger.info(
      `[FILES SERVICES][buildFilesObjects] ERROR with ${file} :`,
      error
    )
  }
}

/**
 *
 * @returns {Promise} Promise object represents the data from external API for all files
 */
export const getFilesContent = async () => {
  try {
    await getFiles()
    await Promise.all(filesNames.map(buildFilesObjects))
  } catch (error) {
    logger.error('[FILES SERVICES][getFilesContent] ERROR: ', error)
    throw new Error('Failed to fetch data from external API')
  }
}
