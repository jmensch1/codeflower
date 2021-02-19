import React from 'react'
import Collapse from './Collapse'
import File from './File'
import Checkbox from 'components/core/Checkbox'
import { isWithinFolder } from 'services/repo'

const Folder = ({
  folder,
  highlight,
  highlightedFolderPath,
  select,
  selectedFolderPath,
  openedFilePath,
  openFile,
  level,
}) => {
  const disabled = !isWithinFolder(folder.path, selectedFolderPath)
  return (
    <Collapse
      label={folder.name}
      level={level}
      initialOpen={
        level === 0 ||
        selectedFolderPath.startsWith(`${folder.path}/`) ||
        (openedFilePath && openedFilePath.startsWith(`${folder.path}/`))
      }
      onMouseEnter={highlight.bind(null, folder.path)}
      disabled={disabled}
      headerRight={({ hovering }) => (
        <div
          style={{
            opacity:
              hovering || selectedFolderPath === folder.path
                ? 1.0
                : disabled
                ? 0.3
                : 0.5,
          }}
        >
          <Checkbox
            checked={selectedFolderPath === folder.path}
            onChange={() => {
              if (selectedFolderPath !== folder.path) select(folder.path)
            }}
          />
        </div>
      )}
    >
      {folder.children.map((child) =>
        child.children ? (
          <Folder
            key={child.name}
            folder={child}
            level={level + 1}
            openedFilePath={openedFilePath}
            openFile={openFile}
            highlight={highlight}
            highlightedFolderPath={highlightedFolderPath}
            select={select}
            selectedFolderPath={selectedFolderPath}
          />
        ) : (
          <File
            key={child.name}
            file={child}
            onClick={openFile.bind(null, child)}
            onMouseEnter={highlight.bind(null, child.path)}
            isOpen={openedFilePath === child.path}
            disabled={disabled}
          />
        )
      )}
    </Collapse>
  )
}

export default Folder
