import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
  IconButton,

  // transitions
  // Slide,
  Zoom,
  // Grow,
  // Collapse,
  // Fade,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />
  // return <Slide direction='up' ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
  root: {
    '& pre': {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      fontSize: 12,
    },
    '& .MuiDialog-paper': {
      minHeight: 'calc(100% - 64px)',
      boxShadow: 'none',
    },
    '& .MuiDialogContent-root': {
      position: 'relative',
    },
  },
  progress: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
}))

const MaxNodes = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('maxNodes')

  return null

  // const handleClose = () => dispatch(closeFile())
  //
  // return (
  //   <Dialog
  //     className={classes.root}
  //     onClose={handleClose}
  //     open={!!file || !!error || isLoading}
  //     fullWidth
  //     TransitionComponent={Transition}
  //   >
  //     <DialogTitle>
  //       <Typography variant='h6' component='div'>{ selectedFile }</Typography>
  //       <IconButton
  //         aria-label='close'
  //         className={classes.closeButton}
  //         onClick={handleClose}>
  //         <CloseIcon />
  //       </IconButton>
  //     </DialogTitle>
  //     <DialogContent dividers>
  //       {
  //         isLoading
  //         ? (
  //           <div className={classes.progress}>
  //             <CircularProgress color='inherit' />
  //           </div>
  //         )
  //         : <pre><code>{ file || (error && error.message) }</code></pre>
  //       }
  //     </DialogContent>
  //   </Dialog>
  // )
}

export default MaxNodes
