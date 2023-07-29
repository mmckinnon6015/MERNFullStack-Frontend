import React from "react";

function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      const align = props.align ? ' align-' + props.align: 'center';
      return 'card mb-3 ' + bg + align + txt;
    }
  
    return (
      <div className={classes()} style={{ maxWidth: "35rem" , alignSelf: "center"}}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
  }

export default Card