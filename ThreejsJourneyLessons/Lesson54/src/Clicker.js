import { useRef, useEffect, useState } from 'react'

export default function Clicker({ increment, keyName, color })
{

    // console.log(keyName)
    // console.log(color)
    // console.log(increment)
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
    const buttonRef = useRef()
    // console.log(buttonRef)

    useEffect(() => 
    {
        buttonRef.current.style.backgroundColor = 'papayawhip'
        buttonRef.current.style.color = 'salmon'
        // const savedCount = parseInt(localStorage.getItem('count') ?? 0)
        // console.log(savedCount)
        // setCount(savedCount)
        // console.log('first renderer')
        // console.log(buttonRef.current)
        return () =>
        {
            // console.log('componenet disposed')
            localStorage.removeItem(keyName)
        }
    }, [])

    // let count = 2

    useEffect(() =>
    {
        // console.log('hello')
        localStorage.setItem(keyName, count)
    }, [ count ])

    const buttonClick = () =>
    {
        // console.log('Button has been clicked')
        // count++ 
        // console.log(count)

        // setCount(value => value + 1)
        setCount(count + 1)
        increment()
    }
    

    return <div>
        <div style ={ { color: color }}>Clicks count: { count }</div>
        <button ref={ buttonRef } onClick={ buttonClick }>Click me</button>
    </div>
}