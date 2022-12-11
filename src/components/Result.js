import React from 'react'

const Result = ({name,agreement,item}) => {
  return (
    <div className='flex justify-center flex-col w-[100%]'>
        <div className="flex flex-col space-y-2 text-center text-lg py-5 my-2 bg-gray-200 shadow-xl">
            <div>
            <p className=""><span className='font-semibold '>Name:</span> </p>
            <p>{name}</p>
            </div>
            <div>
                <p className="text-lg font-semibold">Selectors List:</p>
                {item.map((item ,index)=>(
                    <p key={index}>{index+1}. {item}</p>
                ))}
            </div>
            <div>
                <p className='font-semibold'>Agreement to terms and conditions: </p>
                <p className='text-emerald-900 font-semibold'>Yes</p>
            </div>
        </div>
    </div>
  )
}

export default Result