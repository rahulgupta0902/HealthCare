import React  from 'react'
import './Help.css'
import content from '../../Assets/Content'
import {HiSearch} from "react-icons/hi";


import { useNavigate } from 'react-router-dom'

const Help = () => {
  const Navigate =useNavigate();
  return (
    <>
    
    <div className='help-section'>

      <div className='part1'>
        <img src={content.images.photo1} alt = ''/>
        <img src={content.images.photo2} alt = ''/>
        <img src={content.images.photo3} alt = ''/>
      </div>

      <div className='part2'>
      <div className="search">
      <div className="searchInputs">
      <div className="searchIcon">
          
            <HiSearch />
         
        </div>
        <input
          type="text"
          placeholder='Search questions, keywords, topics....'
        />
        
      </div>
      </div>
      </div>

      
      <div className="panel-group" id="accordion">
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse1">
        <h4 className="panel-title">
          How can I setup my user profile?
        </h4>
        <img src={content.images.arrow} alt = ''/>
      </div>
      <div id="collapse1" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse2">
        <h4 className="panel-title">
          How does the AI support communication?
        </h4>
        <img src={content.images.arrow} alt = ''/>
      </div>
      <div id="collapse2" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse3">
        <h4 className="panel-title">
          If I keep my zoom camera off will the app still detect my emotions?
        </h4>
        <img src={content.images.arrow} alt = ''/>
      </div>
      <div id="collapse3" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse4">
        <h4 className="panel-title">
          How does the AI calculate candidate score?
        </h4>
        <img src={content.images.arrow} alt = ''/>
      </div>
      <div id="collapse4" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
  </div> 

    

      <div className='part4' onClick={()=>Navigate('/faqs')}>
        More
      </div>
    </div>
    </>
  )
}

export default Help