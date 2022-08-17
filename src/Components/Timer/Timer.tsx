import React, { useState, useRef, useEffect } from 'react'
import './Timer.css'

const Timer = () => {

	// We need ref in this, because we are dealing
	// with JS setInterval to keep track of it and
	// stop it when needed
	const Ref = useRef<any>(null);

	// The state for our timer
	const [timer, setTimer] = useState<string>('00:00:00');
    const [title1, setTitle1] = useState<string>('')
	const [title2, setTitle2] = useState<string>('')
	const [title3, setTitle3] = useState<string>('')
	const [title, setTitle] = useState<string>('')

	const getTimeRemaining = (e: string | Date) => {
		e=e.toString()
		let x=new Date();
		const total = Date.parse(e) - Date.parse(x.toString());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 / 60 / 60) % 24);
		return {
			total, hours, minutes, seconds
		};
	}


	const startTimer = (e: Date) => {
		let { total, hours, minutes, seconds }
					= getTimeRemaining(e);
		if (total >= 0) {

			// update the timer
			// check if less than 10 then we need to
			// add '0' at the beginning of the variable
			setTimer(
				(hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}


	const clearTimer = (e: Date) => {

		// If you adjust it you should also need to
		// adjust the Endtime formula we are about
		// to code next	
		setTimer(title);

		// If you try to remove this line the
		// updating of timer Variable will be
		// after 1000ms or 1sec
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = (e: any) => {
		let deadline = new Date();
		e=e.toString();
		// This is where you need to adjust if
		// you entend to add more time
		deadline.setSeconds(deadline.getSeconds() + ans );
		return deadline;
	}

	// We can use useEffect so that when the component
	// mount the timer will start as soon as possible

	// We put empty array to act as componentDid
	// mount only
	useEffect(() => {
		clearTimer(getDeadTime(title));
	}, []);

	// Another way to call the clearTimer() to start
	// the countdown is via action event from the
	// button first we create function to be called
	// by the button
	const [start,setStart]=useState(0);
	const [ans,setAns] = useState(0);

	
	const convert = () => {
		
		setAns(
			(parseInt(title1)*3600)+(parseInt(title2)*60)+parseInt(title3)
		)
		setTitle(
			(parseInt(title1) > 9 ? parseInt(title1) : '0' + parseInt(title1)) + ':' +
			(parseInt(title2) > 9 ? parseInt(title2) : '0' + parseInt(title2)) + ':'
			+ (parseInt(title3)> 9 ? parseInt(title3) : '0' + parseInt(title3))
		)
		
	   
	   clearTimer(getDeadTime(title));
	   setStart(
		   start+1
	   );
	}
    
	return (
		<div className="timer">
			{
			start === 0?
			(<>
			<div className='countdown-timer'>
			
			<input type='text' placeholder='00'onChange={event => setTitle1(event.target.value)} />
			{':'}
			<input type='text' placeholder='00' onChange={event => setTitle2(event.target.value)} />
			{':'}
            <input type='text' placeholder='00' onChange={event => setTitle3(event.target.value)} />
			
			</div>
			<button onClick={()=>{convert()}}>Set</button>
			
		
			
			</>):start === 1?
            (<>
			<div className='countdown-timer'>
			{title}
			</div>
			<button onClick={()=>{convert()}}>Start the Countdown!</button>
			</>):
			(<>
				<div className='countdown-timer'>
			{timer}
			</div>
				<button onClick={()=>setStart(0)}>Reset</button>
				</>)}

		</div>
	)
}

export default Timer;
