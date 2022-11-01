import styled from "styled-components"

const Title=styled.h1`
        font-size:2em;
    `;
const SpanName=styled.span`
        font-size: 1em;
        color:#FF0101;
    `
const Greeting=styled.span`
        font-size: 0.9em;
        color:#000;
        font-familly:roboto;
        font-weight:500
    `
export default function Welcome(props){
    
    return(
        <>
            <div className="title">
                <Title>Bonjour <SpanName>{props.name}</SpanName></Title>                
            </div>    
            <div className="felicitation">
                <Greeting>Félicitation! Vous avez explosé vos objectifs hier</Greeting>
            </div>
        </>
    )
}