import { Navigation, Route } from 'react-router-dom';
import SpotCards from "./SpotCards/SpotCards";
import { useParams } from 'react-router-dom'
import './index.css'
import CreateSpotForm from './CreateSpotForm/CreateSpot';

export default function Spots () {
    return (
        <>
         <SpotCards />
        </> 
         
    ) 
}