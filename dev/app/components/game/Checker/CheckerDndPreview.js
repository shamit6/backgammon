import React, { Component, PropTypes }  from 'react'
import { DragLayer } from 'react-dnd'
import CheckerChip from './CheckerChip'

import style from './style.css';

const previewCollect = monitor => ({
        sourceOffset: monitor.getSourceClientOffset()
    });

class CheckerPreview extends Component {

  static propTypes = {
      isDragging: PropTypes.bool,
      sourceOffset: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
      })
  };

    render () {
        const { isDragging, sourceOffset } = this.props;
        if (!isDragging) { return null; }

        const style2 = {
                transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
            };

        return <div className={style.checkerDndPreview} style={style2}>
                <CheckerChip isClient={this.props.isClient}/>
            </div>
    }
}

export default DragLayer(previewCollect)(CheckerPreview)
