import React from "react";
import Header from "../layout/Header";
import {Barchart as Barchart2} from "../components/charts/example/Barchart";
import RightMenuBar from "./RightMenuBar";
import Welcome from "../components/Welcome";
import ActivityChart from "../components/charts/real/ActivityChart";

export default function Home(){
    return(
        <React.Fragment>
            <div className="header">
                {/* Zonne de menu et logo de l'application (partie statique) */}
                <Header />
            </div>
            <div className="body">
                <div className="rigth">
                    {/* espace avec les icones fonctionnelles */}
                    <RightMenuBar />
                </div>
                <div className="center">
                    {/* espace d'affichage principale des tableaux de bords */}
                    <Welcome name="Gouchere Yves"/> 
                    <div className="allGraph">
                        <div className="leftGraph">
                            <div className="leftGraph__batton">
                                <ActivityChart />
                            </div>
                            <div className="leftGraph__bottom">
                                <div className="leftGraph__bottom--session">
                                Session
                                </div>
                                <div className="leftGraph__bottom--radar">
                                Radar
                                </div>
                                <div className="leftGraph__bottom--objectif">
                                Objectif
                                </div>
                            </div>
                        </div>
                        <div className="rightGraph">

                        </div>
                    </div>               
                </div>
            </div>
        </React.Fragment>
    )
}