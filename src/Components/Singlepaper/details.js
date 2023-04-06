import React from "react";


export default function paperdetails(props){
    
    return(
        <div className={"page-main-container"}>
            <div  style={{width:'60%'}}>

                <div className={"paper-details"}>
                    <span></span>
                    <div className={"paper-details-header"}>
                        <h1>Energy and Policy Considerations for Deep Learning in NLP</h1>
                        </div>
                        <div className={"publishdate"}>
                            <span>Published on: 23 June,2023</span>
                        </div>
                        <div className={"text-data"}>
                            <span>
                            Recent progress in hardware and methodology for training
                             neural networks has ushered in a new generation of large
                              networks trained on abundant data. Key ResultBased on these findings,
                             we propose actionable recommendations to reduce costs 
                             and improve equity in NLP research and practice.Recent progress in hardware and methodology for training
                             neural networks has ushered in a new generation of large
                              networks trained on abundant data. Key ResultBased on these findings,
                             we propose actionable recommendations to reduce costs 
                             and improve equity in NLP research and practice.
                            </span>
                        </div>
                        {/* <div className="Authors">
                            <h5>Authors: </h5>
                            <span>
                            Emma Strubell, Ananya Ganesh, A. McCallum
                                </span>
                        </div> */}

                        <div className="Authors">
                            <h5>Journal: </h5>
                            <span>
                            International Journal of Advancements in Technology
                                </span>
                        </div>
                        <div className={"button"}>
                            <button>[PDF] Semantic Reader</button>
                        </div>
                </div>
                </div>
                <div style={{width:'40%'}}>
                    <div className={"box-details"}>
                        <h1>Category</h1>
                        <span>
                            
                            <li>Computer Science</li>
                            <li>Computer Science</li>
                            <li>NLP</li>
                        </span>
                        <h1 style={{margintop:'5px'}}>Authors</h1>
                         <li>Emma Strubell, Ananya Ganesh, A. McCallum</li>

                        <h1 style={{margintop:'5px'}}>Citations</h1>
                         <li>50 Cited Papers</li>
                    </div>

                </div>
            
        </div>
    );

}