import React, {ComponentType} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper
} from '@material-ui/core';
import Draggable from 'react-draggable';

const DraggablePaperComponent = (props) => {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

type Props = {
    actionControlComponents?: Array<ComponentType>,
    bodyComponent?: ComponentType,
    classes: Object,
    draggable?: Boolean,
    hideActionControlBar?: Boolean,
    hideTitleBar?: Boolean,
    onClose?: (event:Event) => any,
    open?: Boolean,
    scrollable?: Boolean,
    showContentWithText?: Boolean,
    hideDefaultActionControls?: Boolean, 
    text?: String,
    title?: String,
};

const styles = theme => ({
  dialogActionsRoot: {
    display: 'flex',
    justifyContent: 'space-evenly',
  }
})

class MaterialDialog extends React.Component<Props> {

  static defaultProps = {
    draggable: false,
    hideActionControlBar: false,
    hideTitleBar: false,
    open: false,
    scrollable: false,
    showContentWithText: true,
    hideDefaultActionControls: false,
    text: '',
    title: '',
  }

  handleClose = (e) => {
    const { onClose } = this.props;

    if( onClose ) {
        onClose(e);
    }
  };

  defaultActionControls = () => [
    <Button key={'cancel'} onClick={this.handleClose} color="primary">Cancel</Button>,
    <Button key={'okay'} onClick={this.handleClose} color="primary">Okay</Button>,
  ]

  render() {

    const { 
        actionControlComponents, 
        bodyComponent, 
        classes,
        draggable,
        hideActionControlBar,
        hideTitleBar,
        onClose,
        open,
        scrollable,
        showContentWithText, 
        hideDefaultActionControls, 
        text, 
        title,
        ...rest
    } = this.props;

    return (
      <div>
        <Dialog
          aria-labelledby="dialog-title"
          onClose={this.handleClose}
          PaperComponent={draggable ? DraggablePaperComponent : Paper}
          scroll={scrollable?'paper':undefined}
          open={open}
          {...rest}
        >
          {!hideTitleBar && <DialogTitle id="dialog-title">{ title || ''}</DialogTitle>}
          <DialogContent>
            { showContentWithText ? <DialogContentText>{text}</DialogContentText> : bodyComponent }
          </DialogContent>
          {!hideActionControlBar &&
          <DialogActions classes={{ root: classes.dialogActionsRoot }}>
            { !hideDefaultActionControls ? this.defaultActionControls() : (actionControlComponents && actionControlComponents()) }
          </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(MaterialDialog);
