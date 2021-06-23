import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider} from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    dialogPaperSm: {
      width: '550px',
      borderRadius: 2,
      overflow: 'hidden !important',
    },
    dialogPaperMd: {
      width: '720px',
      overflow: 'hidden !important',
    },
  })
)

const ModalComponent = (props) => {
  const classes = useStyles()
  const {
    title,
    isOpen,
    CancelBtnText,
    AcceptBtnText,
    dialogWidth,
    actionTopBorder,
    titleDivider,
    isError,
    minContentHeight,
    CancelBtnFn,
    AcceptBtnFn,
  } = props

  return (
    <div>
      <Dialog
        disableEscapeKeyDown={true}
        open={isOpen}
        onClose={() => CancelBtnFn()}
        aria-labelledby='draggable-dialog-title'
        classes={{
          paper: dialogWidth === 'md' ? classes.dialogPaperMd : classes.dialogPaperSm,
        }}
        disableBackdropClick={true}
      >
        <DialogTitle
          style={{
            height: 64,
            fontSize: 20,
            textAlign: 'center',
            paddingTop: 'auto',
            paddingBottom: 'auto',
          }}
        >
          <div style={{textAlign: 'center'}}>{title}</div>
        </DialogTitle>
        {titleDivider && <Divider />}
        <DialogContent
          id='commonModalParent'
          className='hidden-scrollbar'
          style={{
            padding: 0,
            paddingLeft: 24,
            paddingRight: 24,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div style={{height: '100%', minHeight: minContentHeight || null}}>{props.children}</div>
        </DialogContent>

        <DialogActions
          style={{
            borderTop: actionTopBorder ? '1px solid #D2D5E0' : '',
            textAlign: 'center',
            display: 'inline-block',
            paddingBottom: 32,
            paddingTop: 40,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          {CancelBtnText && (
            <Button
              onClick={() => CancelBtnFn()}
              variant='contained'
              color='secondary'
              size='small'
            >
              {CancelBtnText}
            </Button>
          )}
          {AcceptBtnText && (
            <Button
              disabled={isError}
              onClick={() => AcceptBtnFn()}
              variant='contained'
              color='primary'
              size='small'
            >
              {AcceptBtnText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalComponent
