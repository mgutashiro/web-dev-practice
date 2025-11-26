import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.js'


// console.log(App)

const root = createRoot(document.querySelector('#root'))

const toto = 'there'
root.render(
    <div>
        <App clickersCount={ 3 }>
            <h1>Where am I?</h1>
            <h2>Seriously Tho...</h2> 
        </App> 
    </div>
)

