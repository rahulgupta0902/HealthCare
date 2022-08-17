import React from "react";
import content from '../../Assets/Content'
import "./Navbar.css";


export const Notifications=()=>{
 
    const handlethispopup = (e:any) => {
        const container = document.getElementById('Notifications') as HTMLDivElement;
        if(container!=null && !container.contains(e.target))
        container.style.display = 'none';
      }
    return (

     <div className='notifications-section' id ='Notifications' onMouseUp = {(e) =>handlethispopup(e)}>
        <div className='row1'>
          <div className="col1">Your Notifications</div>
          <div className="col2" style={{cursor:'pointer'}} onClick = {()=>((document.getElementById('row') as HTMLDivElement).style.display='none')}>Clear All</div>
        </div>
        <div className="row2" id='row'>
          <div className="row">
            <div className="col-icon">
            <img src={content.images.notifyneutralicon} alt =''/>
            </div>
            <div className="col-text">
             <div className="The-Notification">You seem to have a spike in your emotion.</div>
             <div className="Notification-popup-time">5 minutes ago</div>
            </div>
          </div>
          <div className="row">
            <div className="col-icon">
            <img src={content.images.suggestion} alt =''/>
            </div>
            <div className="col-text">
             <div className="The-Notification">Your analysis suggest that you might be experiencing emotional imbalance</div>
             <div className="Notification-popup-time">40 minutes ago</div>
            </div>
          </div>
          <div className="row">
            <div className="col-icon">
              <img src={content.images.alert} alt =''/>
            </div>
            <div className="col-text">
             <div className="The-Notification">You havent added your mood in a while, would you like to add one now?</div>
             <div className="Notification-popup-time">1 day ago</div>
            </div>
          </div>
          <div className="row">
            <div className="col-icon">
            <img src={content.images.heal} alt =''/>
            </div>
            <div className="col-text">
             <div className="The-Notification">Hey! you seem to have not visited your healing section. Please check it!</div>
             <div className="Notification-popup-time">2 day ago</div>
            </div>
          </div>
        </div>
       </div>)
      }
 