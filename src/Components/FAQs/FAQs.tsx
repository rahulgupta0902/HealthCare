import React  from 'react'
import './FAQs.css'
import content from '../../Assets/Content'


const FAQs = () => {
 

    return (<>

        <div className='faqs-section'>
            <div className='faqs1'>
             <div className='faqs1r1'>Frequently Asked Questions</div>
             <div className='faqs1r2'>
                <img src={content.images.faqs} alt ='' />
             </div>
            </div>

 <div className='faqs2'>
   <div className="panel-group" id="accordion">
    <hr/>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse1" >
        <h4 className="panel-title">
        How can I setup my user profile?
        </h4>
        <img src={content.images.plus} alt = ''/>
      </div>
      <div id="collapse1" className="panel-collapse collapse" >
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    <hr/>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse2">
        <h4 className="panel-title">
        What all emotions can the AI detect?
        </h4>
        <img src={content.images.plus} alt=''/>
      </div>
      <div id="collapse2" className="panel-collapse collapse">
        <div className="panel-body">
            <div className='part1'>
                <img src={content.images.happy} alt=''/>
                <img src={content.images.neutral} alt=''/>
                <img src={content.images.sadness} alt=''/>
                <img src={content.images.fear} alt=''/>
                <img src={content.images.surprise} alt=''/>
                <img src={content.images.anger} alt=''/>
            </div>
            <div className='part2'>The AI detects HAPPY, NEUTRAL, SAD, FEAR, SURPRISE AND ANGER emotions 
            <span className='triviatext'>(From left to right in the image).</span>
            <br/><br/>
            <span className='triviatext'>Following explains each emoji and its emotion:</span> 
            </div>
            <div className='part3'>
                <div className='part3_1'><img src={content.images.happy} alt=''/>Happiness is an emotional state characterized by feelings of joy, satisfaction, contentment, and fulfillment.</div>
                <div className='part3_2'><img src={content.images.neutral} alt=''/>Neutral</div>
                <div className='part3_3'><img src={content.images.sadness} alt=''/>Sadness is an emotional pain associated with, or characterized by, feelings of disadvantage, loss, despair, grief, helplessness, disappointment and sorrow.</div>
                <div className='part3_4'><img src={content.images.fear} alt=''/>Fear is an emotion in response to perceiving or recognizing a danger or threat.</div>
                <div className='part3_5'><img src={content.images.surprise} alt=''/>Surprise is an emotion that a person might feel if something unexpected happens.</div>
                <div className='part3_6'><img src={content.images.anger} alt=''/>Anger is an emotion characterized by antagonism toward someone or something you feel has deliberately done you wrong.</div>
            </div>
        </div>
      </div>
    </div>
    <hr/>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse3">
        <h4 className="panel-title">
        How does the AI detect my emotions?
        </h4>
        <img src={content.images.plus} alt=''/>
      </div>
      <div id="collapse3" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    <hr/>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse4">
        <h4 className="panel-title">
        Does the Emoitonal Balance graph show my emotion inputs as well?
        </h4>
        <img src={content.images.plus} alt=''/>
      </div>
      <div id="collapse4" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    <hr/>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse5">
        <h4 className="panel-title">
        What is emotion history?
        </h4>
        <img src={content.images.plus} alt=''/>
      </div>
      <div id="collapse5" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    <hr/>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse6">
        <h4 className="panel-title">
        How does promodoro focus help me?
        </h4>
        <img src={content.images.plus} alt=''/>
      </div>
      <div id="collapse6" className="panel-collapse collapse">
        <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
    </div>
    <hr/>
    <div className="panel panel-default">
      <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse7">
        <h4 className="panel-title">
        If I keep my zoom camera off will the app still detect my emotions?
        </h4>
        <img src={content.images.plus} alt=''/>
      </div>
      <div id="collapse7" className="panel-collapse collapse in">
        <div className="panel-body"></div>
      </div>
    </div>
    <hr/>
  </div> 
  

            </div>
        </div>
    
        </>
  )
}

export default FAQs









