import React, { useState } from 'react';
import "./Settings.css";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import "animate.css";
import { FaEdit } from "react-icons/fa";
import { Switch } from '@mui/material';
import SubscriptionPlan from './SubscriptionPlan';
import content from '../../Assets/Content';


const style = { alignItems: "center" };

type FormData={
  Name:string,
  Display_name:string,
  Emailid:string,
  Password:string
}
type EmergencyData ={
  Family_Name : string,
  Family_Email : string,
  Friend_Name : string,
  Friend_Email:string,
  CoWorker_Name : string,
  CoWorker_Email:string,

}
type SendData = {
  family:string,
  friends:string,
  coworkers:string
}
interface PropsDiv{
  isDivOpen:boolean,
  setDivOpen:any
}
const Settings= () => {
    const data:FormData = {
        Name : "",
        Display_name : "",
        Emailid : "",
        Password : ""
    }
    const data1:EmergencyData = {
        Family_Name : "",
        Family_Email : "",
        Friend_Name : "",
        Friend_Email:"",
        CoWorker_Name : "",
        CoWorker_Email:""
    }
    const data2:SendData = {
        family : "false",
        friends : "false",
        coworkers : "false",
    }
    const [userData,setUserData] = React.useState<FormData>(data);
    const [emergencyData,setEmergency]= React.useState<EmergencyData>(data1);
    const [permissions,setPermissions] = React.useState<SendData>(data2)

    //Variables to show the Section Content
    const [account,setAboutDetails] = React.useState<boolean>(false);
    const [subscription,setSubscription] = React.useState<boolean>(false);
    const [quicksettings,setQuickSettings] = React.useState<boolean>(false);
    const [privacy,setPrivacy] = React.useState<boolean>(false);

    
    const handleAccountSubmit = (e:any)=>{
        e.preventDefault();
        console.log(userData)
        console.log("Submitted")
    }
    const handleEmergency = (e : any)=>{
        setEmergency((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }));
          console.log(emergencyData)
    }
    const handleUserDataChange = (e: any)=>{
        setUserData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }));
    }
    const handlePermissions = (e:any)=>{
        setPermissions((prevData) => ({
            ...prevData,            
            [e.target.name]: e.target.checked ? "true" : "false",
          }));
          console.log(permissions)
    }
    
// Function and Variables for Profile Picture
    const uploadedImage = React.useRef<any>(null);
    const imageUploader = React.useRef<any>(null);
   
    
    const handleImageUpload = (e:any) => {
        const [file]:any = e.target.files;
        if (file) {
          const reader:FileReader = new FileReader();
          const { current } = uploadedImage;
          current.file = file;
          reader.onload = (e:any) => {
            current.src = e.target?.result;
          };
          reader.readAsDataURL(file);
        }
      };
      

    const handleDivContainer =(isDivOpen:any,setDivOpen:any)=>{
      setTimeout(() => {
        if (isDivOpen) {
          setDivOpen(false);
        } else {
          setDivOpen(true);
        }
      }, 200);

    }
  return (
    <>
 

    <div className='settingsContainer'>
        <div ><img className='leftimg' src={content.SettingsImages.settingsleft}/></div>
        <div ><img className='rightimg' src={content.SettingsImages.settingsright}/></div>
        <div className='settingsContent primaryalign'>
        <div className="animate__animated animate__fadeInLeft  col-md-4.2 col-md-4 ">
          <div className='margins'>
            <div className="upper" onClick={() => {handleDivContainer(account,setAboutDetails)}}>
              <div className="category-heading">
                <header className="headerText flex-grow-1">
                  Account Details
                </header>
                <div className="mx-4 p-2 align-self-center">
                  {account === true ? (
                    <img src={content.SettingsImages.downarrowicon}/>
                    ) : (
                  < img src={content.SettingsImages.uparrowicon} />
                  )}
                </div>
              </div>
           </div>
          {account=== true ? (
            <div className="lower p-2 ">
              <div className="p-2 mx-3 animate__animated  animate__fadeInUp ">
              <div className='primaryalign'>  
                <div className="ImageDivOne primaryalign">
                  <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader} style={{display: "none"}}/>
                  <div className="ImageDivTwo primaryalign" onClick={() => imageUploader.current.click()}>
                    <img ref={uploadedImage} style={{width: "15rem",height: "15rem",position: "absolute",borderRadius:"15rem"}}/>
                  </div>
                </div>
              </div>
              <Form onSubmit={handleAccountSubmit}>               
                <FormGroup row style={style}>
                  <Label for="exampleText" sm={3} className="fontText">Name</Label>
                  <Col sm={12}>
                    <Input required
                      name="Name"
                      type="text"
                      className="inputText"
                      style={{ lineHeight: "0.8" }}
                      value={userData.Name}
                      onChange={handleUserDataChange}
                      autoComplete="off"
                    />
                  </Col>
                </FormGroup>   
                <FormGroup row style={style}>
                  <Label for="exampleText" sm={3} className="fontText">Display name</Label>
                  <Col sm={12}>
                    <Input required
                      name="Display_name"
                      type="text"
                      className="inputText"
                      style={{ lineHeight: "0.8" }}
                      value={userData.Display_name}
                      onChange={handleUserDataChange}
                      autoComplete="off"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row style={style}>
                  <Label for="exampleText" sm={3} className="fontText">Email id</Label>
                  <Col sm={12}>
                    <Input                   
                      required
                      name="Emailid"
                      type="email"
                      className="inputText"
                      style={{ lineHeight: "1.5" }}
                      value={userData.Emailid}
                      onChange={handleUserDataChange}
                      autoComplete="off"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row style={style}>
                  <Label for="exampleText" sm={3} className="fontText">Password</Label>
                  <Col sm={12}>
                    <Input              
                      required
                      name="Password"
                      type="password"
                      className="inputText"
                      style={{ lineHeight: "0.8" }}
                      value={userData.Password}
                      onChange={handleUserDataChange}
                      autoComplete="off"
                    />
                  </Col>
                </FormGroup>  
                <button className="savebtn" type='submit'>SAVE NEW CHANGES</button>
                </Form>           
              </div>
            </div>
            ) : (
            <div></div>
          )}
          <div className='divider'></div>
          <div className="upper" onClick={() => {handleDivContainer(subscription,setSubscription)}}>
            <div className="category-heading d-flex">
              <header className="headerText flex-grow-1">My subscription plan</header>
              <div className="mx-4 p-2 align-self-center">               
              {subscription === true ? (
                  <img src={content.SettingsImages.downarrowicon}/>
                ) : (
                  <img src={content.SettingsImages.uparrowicon} />
              )}
              </div>
            </div>
          </div>
          {subscription=== true ? (
            <div className="lower p-2 ">
              <div className="p-2 mx-3 animate__animated animate__zoomIn primaryalign">     
              <SubscriptionPlan/>           
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className='divider'></div>
          <div className="upper" onClick={() => {handleDivContainer(quicksettings,setQuickSettings)}}>           
            <div className="category-heading d-flex">
              <header className="headerText flex-grow-1">My emergency contacts</header>
              <div className="mx-4 p-2 align-self-center">
                {quicksettings === true ? (<img src={content.SettingsImages.downarrowicon}/>) : (<img src={content.SettingsImages.uparrowicon} />)}
              </div>
            </div>
          </div>
          {quicksettings=== true ? (
            <div className="lower p-2 ">
              <div className="p-2 mx-3 animate__animated animate__zoomIn">
                <div className='primaryalign'>
                  <div className='emergencydiv1'>Please include the contact information for one family member, friend, and coworker. If we observe any irregularities in your emotions, we will notify these contacts. In the event of an emergency, you can also send them a notification by clicking on the Quick Support button in the menu bar.</div>
                  <div className='emailiddiv secondaryalign2'>
                    <div>
                      <div className='primaryalign textalign3'>Family</div>
                      <Form onSubmit={handleEmergency}>                
                      <FormGroup row style={style}  className="primaryalign2">
                        <Label for="exampleText" sm={3} className="fontText textalign2" >Name</Label>
                        <Col sm={9}>
                        <Input                   
                          required
                          name="Family_Name"
                          type="text"
                          className="inputText"
                          style={{ lineHeight: "0.8" }}
                          value={emergencyData.Family_Name}
                          onChange={handleEmergency}
                          autoComplete="off"
                          />
                        </Col>
                      </FormGroup>    
                      <FormGroup row style={style}  className="primaryalign2">
                      <Label for="exampleText" sm={3} className="fontText textalign2">Email id</Label>
                      <Col sm={9}>
                      <Input
                          required
                          name="Family_Email"
                          type="email"
                          className="inputText"
                          style={{ lineHeight: "1.5" }}
                          value={emergencyData.Family_Email}
                          onChange={handleEmergency}
                          autoComplete="off"
                        />
                      </Col>
                      <button className="savebtn" type='submit' style={{width:"16rem"}}>SAVE NEW CHANGES</button>
                    </FormGroup>               
                </Form>
                </div>
                <div>
                <div className='primaryalign textalign3'>Friends</div>
                <Form onSubmit={handleAccountSubmit}>
                <FormGroup row style={style}  className="primaryalign2">
                  <Label for="exampleText" sm={3} className="fontText textalign2" >Name</Label>
                  <Col sm={9}>
                  <Input                     
                      required
                      name="Friend_Name"
                      type="text"
                      className="inputText"
                      style={{ lineHeight: "0.8" }}
                      value={emergencyData.Friend_Name}
                      onChange={handleEmergency}
                      autoComplete="off"
                    />
                  </Col>
                </FormGroup>    
                <FormGroup row style={style}  className="primaryalign2">
                  <Label for="exampleText" sm={3} className="fontText textalign2">Email id</Label>
                  <Col sm={9}>
                    <Input                     
                      required
                      name="Friend_Email"
                      type="email"
                      className="inputText"
                      style={{ lineHeight: "1.5" }}
                      value={emergencyData.Friend_Email}
                      onChange={handleEmergency}
                      autoComplete="off"
                    />
                  </Col>
                </FormGroup>
                <button className="savebtn" type='submit' style={{width:"16rem",marginLeft:"3rem"}}>SAVE NEW CHANGES</button>
              </Form>
            </div>
            <div>
              <div className='primaryalign textalign3'>Co-worker</div>
                <Form onSubmit={handleAccountSubmit} >                    
                <FormGroup row style={style}  className="primaryalign2">
                  <Label for="exampleText" sm={3} className="fontText textalign2">Name</Label>
                  <Col sm={9}>
                    <Input                     
                      required
                      name="CoWorker_Name"
                      type="text"
                      className="inputText"
                      style={{ lineHeight: "0.8" }}
                      value={emergencyData.CoWorker_Name}
                      onChange={handleEmergency}
                      autoComplete="off"
                    />
                  </Col>
                </FormGroup>  
                <FormGroup row style={style}  className="primaryalign2">
                  <Label for="exampleText" sm={3} className="fontText textalign2">Email id</Label>
                  <Col sm={9}>
                    <Input                     
                      required
                      name="CoWorker_Email"
                      type="email"
                      className="inputText"
                      style={{ lineHeight: "1.5" }}
                      value={emergencyData.CoWorker_Email}
                      onChange={handleEmergency}
                      autoComplete="off"
                    />
                  </Col>
                  <button className="savebtn" type='submit' style={{width:"16rem"}}>SAVE NEW CHANGES</button>
                </FormGroup>
              </Form>
            </div>
          </div>
          <div className='headerText'>Quick Support Settings</div>
            <div className='quicksupportbox'>
              <div className='primaryalign'>                    
                <div className='editicon'><FaEdit size={20}/></div>
                  <div className='alertcontent'>
                    <div>ALERT MESSAGE FROM I'M BESIDE YOU!</div>
                      <div>Rimi has listed you as their quick support contact.She seems to need your help and support.</div>
                        <div className='detailsalert'>
                          Name: Rimi James
                          <br/>
                          Time the alert was triggered: 10:55 am
                          <br/>
                          Location: B 32, Part 2, Lala Lajpat Rai Marg, Delhi, 110024 (address from Google database)
                      </div>
                  </div>
                </div>
            </div>
            <div className='sendalertbox textalign3'>
              <div>Send alert to contacts</div>
                <div className='checkboxesgroup'>
                  <div><input type="checkbox" name="family" onChange={handlePermissions} value={permissions.family} style={{marginRight:"1rem"}}/>Family <span style={{fontWeight :"300",fontSize:"1rem",}}>{emergencyData.Family_Name}</span></div>
                  <div><input type="checkbox" name="friends" onChange={handlePermissions} value={permissions.friends} style={{marginRight:"1rem"}}/>Friends <span style={{fontWeight :"300",fontSize:"1rem"}}>{emergencyData.Friend_Name}</span></div>
                  <div><input type="checkbox" name="coworkers" onChange={handlePermissions}  value={permissions.coworkers} style={{marginRight:"1rem"}}/>Co-worker <span style={{fontWeight :"300",fontSize:"1rem"}}>{emergencyData.CoWorker_Name}</span></div>
                </div>
            </div>
            <div className='manualalert textalign3'>
              <div>
                <div style={{color : "#6F9792"}}>Send Alert Manually when needed</div>
                  <br/>
                <div>IBY will be not able to send emergency notifications to your preferred conatcts</div>
              </div>
              <div><Switch/></div>
            </div>
          </div>                
        </div>
      </div>
      ) : (<div></div>)}
        <div className="upper" onClick={() => {handleDivContainer(privacy,setPrivacy)}}>
            <div className='divider'></div>
            <div className="category-heading d-flex">
              <header className="headerText flex-grow-1">Privacy Policy</header>
              <div className="mx-4 p-2 align-self-center">
                {privacy === true ? (<img src={content.SettingsImages.downarrowicon}/>) : (<img src={content.SettingsImages.uparrowicon} />)}
              </div>
            </div>
        </div>
        {privacy=== true ? (
          <div className="lower p-2">
            <div className="p-2 mx-3 animate__animated animate__fadeInUp ">
              <div className='primaryalign'>
                <div className='privacycontainers secondaryalign'>                   
                  <div >Learn more about how IBY collects and uses data and your rights as a IBY user.</div>
                  <div><img src={content.SettingsImages.privacyicon}/></div>
                </div> 
              </div>               
            </div>
          </div>) : (<div></div>)}
        <div className='divider'></div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Settings