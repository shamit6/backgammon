import React  from 'react';
import style from './style.css'

const CheckerChip = (props) =>
  <div className={props.isClient?style.checkerChipClient:style.checkerChipOpponent}/>

export default CheckerChip
