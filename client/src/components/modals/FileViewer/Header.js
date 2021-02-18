import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import HighlightSelect from './HighlightSelect'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    borderBottom: `1px ${theme.palette.divider} solid`,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontStyle: 'italic',
  },
  select: {
    width: 150,
    display: 'inline-block',
  },
}))

const Header = ({ metadata, onClose }) => {
  const classes = useStyles()

  return (
    <DialogTitle className={classes.root}>
      <Typography className={classes.name} variant="h6" component="div">
        {metadata.name}
      </Typography>
      {metadata.languageUnknown ? (
        <Typography className={classes.meta} variant="body2" component="div">
          Language unknown
        </Typography>
      ) : (
        <Typography className={classes.meta} variant="body2" component="div">
          {metadata.size} lines of {metadata.language}
        </Typography>
      )}
      <div className={classes.select}>
        <HighlightSelect />
      </div>
      {/*<Typography className={classes.meta} variant="body2" component="div">
        {filePath.split('/').join(' • ')}
      </Typography>*/}
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  )
}

export default Header
