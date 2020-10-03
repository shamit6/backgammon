import React from "react";
import { Header, Image } from "semantic-ui-react";
import style from "./style.css";
import "../../content/dices.png";

const Logo = ({ size, textAlign }) => (
  <Header inverted size={size} textAlign={textAlign}>
    <Image className={style.image} src="/images/dices.png" />
    <div className={style.container}>
      Shubapp
      <br />
      backgammon
    </div>
  </Header>
);

export default Logo;
