import { useEffect, useState } from "react";
import * as d3 from "d3";

export function useDataFetch(){
    const [loaded, setLoaded]=useState(false)
    const [activities, setActivities]=useState([])
    const [sessions, setSessions]=useState([])
    const [performances, setPerformances]=useState([])

    useEffect(()=>{
        /* Récupérons les données depuis le service distants */
        d3.json("data.json").then((d)=>{
           // console.log(d)
           setActivities(d.activite)
           setSessions(d.session)
           setPerformances(d.performances)
        })
    },[loaded])

    return {activities, sessions, performances}
}
