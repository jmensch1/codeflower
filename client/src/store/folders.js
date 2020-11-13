import { types as repoTypes } from './repo'
import { types as treeTypes } from './tree'
import { updateLanguages } from './languages'

export const types = {
  SET_FOLDER_PATH: 'folders/SET_FOLDER_PATH'
}

// returns an array of all the paths in the given repo
function getFolderPaths(root) {
  const folderPaths = []

  // generate path strings and totalNode counts
  ;(function recurse(folder, folderPath) {
    if (folder.children) {
      folderPath += folder.name + '/'

      const total = folder.children.reduce((prev, cur) => {
        return prev + recurse(cur, folderPath)
      }, 1)

      folderPaths.unshift({
        pathName: folderPath,
        totalNodes: total
      })

      return total
    } else {
      return 1
    }

  })(root, '')

  // take off trailing slashes
  folderPaths.forEach(path => path.pathName = path.pathName.slice(0, -1))

  return folderPaths
}

// return the portion of a repo object indicated by the given folderPath
function getFolder(root, folderPath, depth) {
  let folder = root
  const props = folderPath.split('/')
  for (let i = 1; i < props.length; i++)  {
    for (let j = 0; j < folder.children.length; j++) {
      if (folder.children[j].name === props[i]) {
        folder = folder.children[j]
        break
      }
    }
  }
  return folder
}

export const setFolderPath = (folderPath) => {
  return (dispatch, getState) => {
    const { tree } = getState().repo.cloc
    const folder = getFolder(tree, folderPath)
    dispatch({
      type: types.SET_FOLDER_PATH,
      data: folderPath,
    })
    dispatch({
      type: treeTypes.SET_TREE,
      data: folder,
    })
    dispatch(updateLanguages(folder))
  }
}

const initialState = {
  selectedFolder: null,
  folderPaths: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case repoTypes.GET_REPO_SUCCESS:
      return {
        selectedFolder: null,
        folderPaths: getFolderPaths(action.data.cloc.tree),
      }
    case types.SET_FOLDER_PATH:
      return {
        ...(state || {}),
        selectedFolder: action.data,
      }
    default:
      return state
  }
}

export default reducer
