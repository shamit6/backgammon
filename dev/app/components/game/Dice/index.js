import React, { PropTypes }  from 'react';

import style from './style.css';

const randomize = (maxNumber, minNumber = 0) => {
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber + 1;
}

class Dice extends React.Component {
  static propTypes = {
  };

	constructor(props) {
		super(props);
    this.state = ::this.calcDegreeByNumber(this.props.intialNumber);
	}

  componentWillMount(){
    // TODO unmount
    this.props.dicingFire[this.props.diceName] = ::this.updateDiceNumber;
  }

  calcDegreeByNumber(mumber){
      let nextDegX = 0;
      let nextDegY = 0;
      let nextDegZ = 0;

      switch (mumber){
          // case 1: {
          //     break;
          // }
          case 2: {
              nextDegX = -90;
              break;
          }
          case 3: {
              nextDegY = -90;
              break;
          }
          case 4: {
              nextDegY = 90;
              break;
          }
          case 5: {
              nextDegX = -90;
              nextDegZ = 180;
              break;
          }
          case 6: {
              nextDegY = 180;
              break;
          }
          default: {
          }
      }

      const currentDegX = this.state?this.state.degX:0;
      const currentDegY = this.state?this.state.degY:0;

      const directX = (currentDegX>0)?-1:1;
      const directY = (currentDegY>0)?-1:1;
      nextDegX += randomize(1,0)*360*directX;
      nextDegY += randomize(1,0)*360*directY;
      return {degX:nextDegX, degY:nextDegY, degZ:nextDegZ};
  }

  updateDiceNumber(nextNumber){
      this.setState(this.calcDegreeByNumber(nextNumber));
  }

  render() {
  	return <div className={style.dice} ref={this.props.divRef}
                style={{transform:"rotateX("+this.state.degX+"deg) rotateY("+this.state.degY+"deg) rotateZ("+this.state.degZ+"deg)"}}>
              <div className={style.one}>1</div>
              <div className={style.two}>2</div>
              <div className={style.three}>3</div>
              <div className={style.four}>4</div>
              <div className={style.five}>5</div>
              <div className={style.six}>6</div>
            </div>
  }

}

export default Dice
