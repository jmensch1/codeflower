import React from 'react'
import { useFiles } from 'store/selectors'

const FileViewer = () => {
  const files = useFiles()
  const file = files.selectedFile
    ? files.files[files.selectedFile]
    : null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        height: 600,
        width: 400,
        border: '1px black solid',
        padding: 10,
        zIndex: 1,
        overflow: 'auto'
      }}
    >
      <pre
        style={{
          //overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        { file }
      </pre>
    </div>
  )
}

export default FileViewer
