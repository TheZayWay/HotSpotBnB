import { Navigation, Route } from 'react-router-dom';
import SpotCards from "./SpotCards/SpotCards";

import './index.css'
import { useParams } from 'react-router-dom'
export default function Spots () {
    return (
        <>
         <h1>All spots</h1>
         <SpotCards />
        </> 
         
    ) 
}