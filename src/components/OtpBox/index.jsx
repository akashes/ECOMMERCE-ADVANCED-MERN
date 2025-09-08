import React, { useState } from 'react'

const OtpInput=({length,onChange})=>{
    const[otp,setOtp]=useState(new Array(length).fill(''));

    const handleChange=(element,index)=>{
        const value = element.value;
        if(isNaN(value)) return; // only numbers are allowed

        //update OTP value
        const newOtp=[...otp];
        newOtp[index]=value;
        setOtp(newOtp);
        onChange(newOtp.join(''));

        //focus next input
        if(value && index<length-1){
           const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
        }

}
const handleKeyDown=(event,index)=>{
    if(event.key==='Backspace' && !otp[index] && index>0){
        document.getElementById(`otp-input-${index-1}`).focus();

    }
}
return(
    <div className='flex gap-1 justify-center otpBox' >
        {
            otp.map((data,index)=>(
                <input 

                type="text"
                key={index}
                id={`otp-input-${index}`}
                maxLength="1"
                value={otp[index]}
                onChange={(e)=>handleChange(e.target,index)}
                className=' w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] text-center text-[15px] sm:text-[17px] border border-gray-300 rounded-md'
                // onKeyDown={(e)=>e.key === 'Backspace' && handleChange(e.target,index-1)}
                onKeyDown={(e)=>handleKeyDown(e,index)}
                style={{
                   
                    border: '1px solid gray',
                    borderRadius: '5px',
                }}
                
                />
            ))
        }
    </div>
)

}


export default OtpInput
