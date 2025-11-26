import { useMemo, useState } from 'react'
import Clicker from './Clicker.js'
import People from './People.js'

export default function App({ clickersCount, children })
{
    // console.log(props)
    // console.log(clickersCount)
    const [ hasClicker, setHasClicker ] = useState(true)
    const [count, setCount] = useState(0)

    const toggleClickerClick = () =>
    {
        setHasClicker(!hasClicker)
    }
    // console.log('I can do it again')
    // return <h1>My Application</h1>
    const increment = () =>
    {
        setCount(count +1)
    }

    // const colors = []

    // for(let i = 0; i < clickersCount; i++)
    // {
    //     colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 70%)`)
    // }

    const colors = useMemo(() => 
        {
            const colors = []

            for(let i = 0; i < clickersCount; i++)
                colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 70%)`)
            return colors
        }, [clickersCount])


   // creates an x element long array
    // const tempArray = [...Array(clickersCount)]
    // console.log(tempArray)

    // tempArray.map((value, index) =>
    // {
    //     console.log(value, index)
    // })
    
    return <>
        { children }

        <div>Total count: { count }</div>

        <button onClick ={ toggleClickerClick }> { hasClicker ? 'Hide': 'Show'} Clicker</button>
        
        { hasClicker && <>
            { [...Array(clickersCount)].map((value, index) => 
                <Clicker 
                    key={ index }
                    increment={ increment } 
                    keyName={ `count${index}` }
                    color={ colors[index] }
                />
            ) }
        </> }
        <People />
    </>
}

