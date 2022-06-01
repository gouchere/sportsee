
import icone1 from "./../asset/icones/icone1.svg"
import icone3 from "./../asset/icones/icone3.svg"
import icone2 from "./../asset/icones/icone2.svg"
import icone4 from "./../asset/icones/icone4.svg"

export default function RightMenuBar(){
    return(
        <div className="rightMenuBar">
            <div className="rightMenuBar__icones">
                <img src={icone1} alt="icone menu 1" />
                <img src={icone2} alt="icone menu 1" />
                <img src={icone3} alt="icone menu 1" />
                <img src={icone4} alt="icone menu 1" /> 
            </div>
            <span>copiryght SportSee 2020</span>
        </div>
    );
}