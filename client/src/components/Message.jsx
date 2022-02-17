import React from "react";
import "./styles/Message.css";

const color = {
   "Aconteceu alguma falha": 'text-danger',
   "Os dados foram recebidos com sucesso": 'text-success'
};

const Message = ({ children }) => {
   return <div className={"message my-2 " + color[children]} >{children}</div>
}

export default Message;