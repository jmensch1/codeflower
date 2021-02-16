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
  openFile,
  level,
}) => {
  const disabled = !isWithinFolder(folder.path, selectedFolderPath)
  return (
    <Collapse
      label={folder.name}
      level={level}
      initialOpen={level === 0}
      onMouseEnter={highlight.bind(null, folder.path)}
      disabled={disabled}
      headerRight={({ hovering }) => {
        const opacity = hovering || selectedFolderPath === folder.path
          ? 1.0
          : disabled ? 0.3 : 0.5
        return (
          <div style={{ opacity }}>
            <Checkbox
              checked={selectedFolderPath === folder.path}
              onChange={() => {
                if (selectedFolderPath !== folder.path)
                  select(folder.path)
              }}
            />
          </div>
        )
      }}
    >
      {folder.children.map((child) =>
        child.children ? (
          <Folder
            key={child.name}
            folder={child}
            level={level + 1}
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
            openFile={openFile}
            onMouseEnter={highlight.bind(null, child.path)}
            disabled={disabled}
          />
        )
      )}
    </Collapse>
  )
}

export default Folder
