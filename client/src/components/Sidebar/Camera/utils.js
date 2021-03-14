export function downloadDataUri(dataUri, filename) {
  const dl = document.createElement('a')
  document.body.appendChild(dl) // This line makes it work in Firefox.
  dl.setAttribute('href', dataUri)
  dl.setAttribute('download', filename)
  dl.click()
  document.body.removeChild(dl)
}
