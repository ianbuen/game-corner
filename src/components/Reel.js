import React from "react";

function Reel({data, anim}) {

  return data ? (
    <div className="reel" >
      {data.map(({name, url}, i) => 
        <img key={name+"-"+i} src={url} alt={name} style={anim}/>
      )}
    </div>
  ) : null;
}

export default Reel;
