import React from "react";

export default function ActivityChart(){
    const width=900;
    const height=160;
    return(
        <React.Fragment>
            <section className="sec-activity-chart">
                <h1>Activité cotidienne</h1>
                <ul>
                    <li>Poids(Kg)</li>
                    <li>Calories brulées(kCal)</li>
                </ul>
            </section>
            <svg width={width} height={height} viewBox={"0 0 "+width+" "+height+""}
                className="svg-activity" id="svgActivity"/>
        </React.Fragment>
    )
}