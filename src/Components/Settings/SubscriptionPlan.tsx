import React from 'react'
import { Card } from 'reactstrap'
import "./Settings.css"
import { AiOutlineCheck } from 'react-icons/ai';



type Props={
    pack:string,
    price:string,
    choice:boolean,
    buttonText:string,
    features:string[]   
}


const SubscriptionPlan = () => {
    const PackDetails ={
        Free:{
            pack:"Free",
            price:"0",
            features:["Mood prompt","2 Emotion range percentage","Self-care exercise"],
            choice:false,
            buttonText:"Your current plan",            
        },
        Personal:{
            pack:"Personal",
            price:"5",
            features:["Mood prompt","AI emotional analysis","All emotion range percentage","Self-care exercise"],
            choice:true,
            buttonText:"Get Personal"

        },
        Team:{
            pack:"Team",
            price:"10",
            choice:false,
            features:["Mood prompt","AI emotional analysis","All emotion range percentage","Self-care exercise"],
            buttonText:"Get Team"
        }
    }
    const CardPlan=({cardInfo}:any)=>{
        const [isActive,setActive] = React.useState<string>("Monthly");
        const handlePersonalButton =(setPlan:string)=>{
            setActive(setPlan);
        }
        return (
            <div className='CardPlan'>
                <div className='CardPlanHeader'>
                    <div className='settingsSubscriptionHeader'>{cardInfo?.pack}</div>
                    <div className='settingsSubscriptionPrice'>          
                        <div className='price secondaryalign'>              
                            <div className='dollar-sign'>$</div>
                            <div className='plan-price'>{cardInfo?.price}</div>
                            <div className='per-month'>/mon</div>
                        </div>
                    </div>
                </div>
             
                    {cardInfo.choice ? 
                    <div className='settingsSubscriptionChoiceButton'>
                        <div className={isActive=="Monthly"?"activePlanButton primaryalign":"unactivePlanButton primaryalign"} onClick={()=>{handlePersonalButton("Monthly")}}><div>Monthly</div></div>
                        <div className={isActive=="Annually"?"activePlanButton primaryalign":"unactivePlanButton primaryalign"} onClick={()=>{handlePersonalButton("Annually")}}><div>Annually</div></div>
                    </div>:<></>}
              
                <div className='settingsSubscriptionFeatures'>
                    {cardInfo.features.map((feature:string)=>(                        
                        <div className='featureSettings'>
                            <div style={{marginRight:"0.5rem"}}><AiOutlineCheck/></div>
                            <div>{feature}</div>
                        </div>
                        
                    ))}
                </div>
                
                <div className='settingsSubscriptionButton'>
                
                <div className='primary-btn primaryalign'><div className='primary-btn-text'>{cardInfo.buttonText}</div></div>
                </div>
            </div>
        )
    }
  return (
    <div className='subscriptionContainer'>
        <CardPlan cardInfo={PackDetails.Free}/>
        <CardPlan cardInfo={PackDetails.Personal}/>
        <CardPlan cardInfo={PackDetails.Team}/>

    </div>
  )
}

export default SubscriptionPlan