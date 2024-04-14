import React from 'react'
import bg from './pastanew.jpg'
function Footer() {
  return (
    <div>
        <div className="card text-bg-secondary mb-3" style={{maxWidth: "540px"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={bg} className="img-fluid rounded-start" alt="..." style={{borderRadius:"10px",width:"350px",height:"300px",marginTop:"45px",marginLeft:"191px"}}/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">OUR MISSION</h5>
        <p className="card-text">We, at Food On Way, stand for providing a high Quality, Value for money, healthy & nutritious meal to our patrons. We take great pride in saying with conviction that we do not use any artificial colours or preservatives. We use natural and fresh ingredients like lemon, salt, sugar and tomatoes and other spices to do the job of artificial colours and preservatives!.</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Footer