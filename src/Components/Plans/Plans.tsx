import React from 'react';
import './Plans.css'
import illustration from "../../Assets/Plans/illustration.png"


import { useNavigate } from 'react-router';
import Switch from "react-switch";
import content from '../../Assets/Content';
import Navbar from '../Navbar/Navbar';

interface Props {
  details : {
    pack : string,
    price : string,
    first : string,
    second :string,
    third:string,
    fourth :string,
    fifth:string,
    sixth:string,
    seventh:string
  }
}
interface Props2{
  plan:string,
  handleChangePlan : any
}

export const Plans = ({plan,handleChangePlan}:Props2) => {
  const Navigate = useNavigate();
  const [checked,setCheck] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<boolean>(false);
  const [data,setData] = React.useState(content.priceDataMonthly);
  const features:string[] =["AI Emotional Analysis","Emotional Balance Percentage","Self-Care Exercises","Detailed Analysis Report","Mood Prompts","Quick Support","Self Analysis Test"];
  const handleChange = ()=>{
    console.log(checked)
    
    if(checked){
      setData(content.priceDataMonthly)
    }
    else{
      setData(content.priceDataYearly)
    }
    setCheck(!checked)

  }
  const handlePlanUpdated=(plan:string)=>{
    handleChangePlan(plan);
    Navigate('/onboarding')

  }
  const priceColumn =({details}:Props)=>{
    return (
      <div className='price-column'>
        <div className='price-header primaryalign'>
         <div className='price-upper primaryalign'>
          <div className='plans-name'>{details.pack}</div>
          <div className='price secondaryalign'>              
            <div className='dollar-sign'>$</div>
              <div className='plan-price'>{details.price}</div>
              <div className='per-month'>/mon</div>
          </div>
          <button onClick={()=>handlePlanUpdated(details.pack)} className={plan==details.pack?"active-plan-btn":"plan-button"}><div className={plan==details.pack?'active-plan-btn-text':'plan-button-text'}>Start Today</div></button>
          </div>
          <div className='price-down'>
          <div className="divider"></div>         
          <div className="feature">{details.first}</div>
          <div className="feature">{details.second}</div>
          <div className="feature inactive">{details.third}</div>
          <div className="feature inactive">{details.fourth}</div>
          <div className="feature inactive">{details.fifth}</div>
          <div className="feature inactive">{details.sixth}</div>
          <div className="feature inactive">{details.seventh}</div>  
          </div>    
       </div>
      </div>
    );
  };
console.log("PLAN",plan)
  return (
    <>
 
    <div className='plans-container primaryalign'>      
      <div className='plans-header secondaryalign'>Plans that help you grow</div>
        <div className='bottom-border'></div>
        <div className='plans-para'>
           <div className='para-one'>With our scalable packages, you can pay for what you need and leave out what you don’t. We will grow with you. </div>
           <div className='para-two'>Figure out what package is best for you</div>
        </div>
        <div className='plans-table'>    
          <div className='price-comparison'>     
            <div className='price-column'>
              <div className='price-upper'>
              <div className='illustration'>
                <img src={illustration}/>              
              </div>       
              <div className='price-header primaryalign'>
                <div className='period'>                 
                  <div>Billed</div>
                  <div>
                 <label htmlFor="normal-switch">
                   <span>Monthly</span>
                   <Switch
                    onChange={handleChange}
                    checked={checked}
                    offColor = "D5ECD4"
                    onColor='D5ECD4'
                    id="normal-switch"
                    onHandleColor='6F9792'
                    offHandleColor='6F9792'
                    width={56}
                    height={20}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    handleDiameter={30}/>
                  <span>Annually</span>                  
                 </label>                
                </div>  
                </div>  
                </div>    
                </div>
                <div className='price-down'>  
               <div className="divider" ></div>              
              {
                features.map((feature)=>(<div className='feature'>{feature}</div>))
              }      
           </div>
          </div>        
          {data.map((details)=>{
        
            return priceColumn({details});
          })}   
          </div>
        </div>
      </div>
      </>
);}
