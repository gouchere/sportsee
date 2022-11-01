import React, { useEffect } from "react";
import * as d3 from "d3";
import {useDataFetch} from "./../../../hook/useData"

export default function ActivityChart(){
    const width=900;
    const height=160;
    const marginV=20;
    const marginH=50;
    const marginHL=10;
    const {activities}=useDataFetch();
    const cordoneesX=[];
    useEffect(()=>{
        /* Récupération du domaine: correspondant au dix prochains jour de la semaine*/
        const domain=[1,10]
        /* Définition de la plage de sortie */
        const range=[0,width-marginH]
        console.log(activities)
        const svg=d3.select("#svgActivity");
        const scaleX=d3.scaleLinear().domain(domain).range(range)
        /* récupère les extrémuns des deux tableaux */
        const tabExtr=d3.extent(activities,(a)=>a.poids).concat(d3.extent(activities,(a)=>a.calorie))   
        const extremuns=d3.extent(tabExtr);     
        extremuns.reverse();
        const scaleY=d3.scaleLinear().domain(extremuns).range([marginV,height])
        
        
        
        /* Draw axis */
            //axe horizontale
        const x_Axis=d3.axisBottom(scaleX);
        svg.append("g").attr("transform", "translate(10,"+(height-marginV)+")").call(x_Axis)
            //axe verticale
        const y_Axis=d3.axisRight(scaleY).ticks(3)
        svg.append("g").attr("transform", "translate("+((width+marginHL)-marginH)+","+(-20)+")").call(y_Axis)
        
        /* Draw graphics poids */
        svg.selectAll("g").data(activities).enter().append("g")
                          .append("rect")
                          .attr("x", (d,i)=>((marginV)+(width/activities.length)*i))
                          //.attr("y", (height-marginV))
                          //.attr("width",15).attr("height",(d)=>{scaleY(d.poids)})
                          //.attr("transform",(a,i)=>{return 'rotate(180, '+((marginV)+(width/activities.length)*i)+','+(height-marginV)})
        /* svg.append("g").append("rect").attr("x",20).attr("y",(height-marginV)).attr("width",15).attr("height",50)
                       .attr("transform","rotate(180, 20, 140)")
                       svg.append("g").append("rect").attr("x",110).attr("y",(height-marginV)).attr("width",15).attr("height",100)
                       .attr("transform","rotate(180, 110, 140)").attr("fill","red")
                       svg.append("g").append("rect").attr("x",205).attr("y",(height-marginV)).attr("width",15).attr("height",100)
                       .attr("transform","rotate(180, 205, 140)").attr("fill","red")
                       svg.append("g").append("rect").attr("x",300).attr("y",(height-marginV)).attr("width",15).attr("height",100)
                       .attr("transform","rotate(180, 300, 140)").attr("fill","red")
                       svg.append("g").append("rect").attr("x",395).attr("y",(height-marginV)).attr("width",15).attr("height",100)
                       .attr("transform","rotate(180, 395, 140)").attr("fill","red")
                       svg.append("g").append("rect").attr("x",490).attr("y",(height-marginV)).attr("width",15).attr("height",100)
                       .attr("transform","rotate(180, 490, 140)").attr("fill","blue")
                       svg.append("g").append("rect").attr("x",585).attr("y",(height-marginV)).attr("width",15).attr("height",100)
                       .attr("transform","rotate(180, 585, 140)").attr("fill","red") */
    },[activities.length])
    return(
        <React.Fragment>
            <section className="sec-activity-chart">
                <h1>Activité cotidienne</h1>
                <ul>
                    <li>Poids(Kg)</li>
                    <li>Calories brulées(kCal)</li>
                </ul>
            </section>
            <svg width={width} height={height+20} viewBox={"0 0 "+width+" "+height+""}
                className="svg-activity" id="svgActivity"/>
        </React.Fragment>
    )
}