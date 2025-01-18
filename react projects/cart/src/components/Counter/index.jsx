import { useContext } from 'react';
import {AppContext} from './../Cart';

import './style.scss';

const Counter = ({id, count}) => {
  const { updateInputValue, clickedInputTarget } = useContext(AppContext);
  
	return ( 
		<div className="count" onClick = {(e) => {clickedInputTarget(id, e)}}>
			<div className="count__box">
				<input 
          onChange = {(e) => {
            updateInputValue(id, 'manualValue', +e.target.value)
          }} 
          type="number" 
          className="count__input" 
          min="1" 
          max="100" 
          value={count}
          data-btn = "manualValue"
        />
			</div>
			<div className="count__controls">
				<button type="button" className="count__up" data-btn="increase">
					<img src="./img/icons/icon-up.svg" alt="Increase"/>
				</button>
				<button type="button" className="count__down" data-btn="decrease">
					<img src="./img/icons/icon-down.svg" alt="Decrease"/>
				</button>
			</div>
		</div>
	);
}

export default Counter;