import React from 'react';
import './list.css';
import Chatlist from './chatlist/Chatlist';
import Userinfo from './userinfo/Userinfo';

export default function List() {
  return (
    <div className= 'list'>
<Userinfo/>
<Chatlist/>
    </div>
  )
}
