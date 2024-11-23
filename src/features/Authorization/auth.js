import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  selectCount,
} from './counterSlice';


export default function Auth() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      
    </div>
  );
}
