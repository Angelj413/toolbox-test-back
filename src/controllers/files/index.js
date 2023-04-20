import {
  filesObjects,
  getFilesContent,
  rawUnparsedFiles
} from '../../services/files/index.js'

/**
 *
 * @returns {Array} Array of objects [{name: string, lines: Array}]
 */
export const getFiles = async () => {
  let filesData = Object.values(filesObjects)
  if (!filesData.length) {
    await getFilesContent()
    filesData = Object.values(filesObjects)
  }
  return filesData
}

/**
 *
 * @returns {Array} Array of strings [string]
 */
export const getFileNames = async () => {
  let filesNames = Object.keys(filesObjects)
  if (!filesNames.length) {
    await getFilesContent()
    filesNames = Object.keys(filesObjects)
  }
  return filesNames
}

/**
 *
 * @param {string} name
 * @returns {Object} file data parsed
 */
export const findFileByName = async (name) => {
  return filesObjects[name]
}

/**
 *
 * @returns {string} string with data files unparsed
 */
export const getUnparsedFiles = async () => {
  if (rawUnparsedFiles === undefined) await getFilesContent()
  return rawUnparsedFiles
}
