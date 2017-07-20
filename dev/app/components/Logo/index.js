import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import '../../content/dices.png'
import style from './style.css'
import classnames from 'classnames'

const Logo = ({size, textAlign}) => (
  <Header inverted size={size} textAlign={textAlign}>
    <Image className={classnames(style.image)} src='/images/dices.png'/>
    <div className={classnames(style.container)}>Shubapp<br/>backgammon</div>
  </Header>
)

export default Logo
