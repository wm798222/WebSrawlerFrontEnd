import React, { Component, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

export default class Joblist extends Component {
    
    constructor() {
        super();
        this.state = {
            joblist: ["not yet gotten"]
        }
    };
    
    
    handleButtonClick = () => {
        this.loadJobs();


        // axios.get("/getJobList").then(response => {
        //     console.log("getting job list");
        //     console.log(response.data);
            
        //     // this.setState({
        //     //     joblist: response.data
        //     // });
        //     // setJobList(response.data);
        // });
    };

    async loadJobs() {
        const promise = await axios.get("/getJobList");
        const status = promise.status;
        if(status===200)
        {
          const data = promise.data;
          // TODO: this suppose to print something
        //   console.log(data);
          this.setState({joblist:data});
        }
    }

    render() {
        // const [jobList, setJobList] = useState(["Not yet gotten"]);
        return (
            <div>
                {/* <Button onClick={this.handleButtonClick}>Get Jobs From Crawler</Button> */}
                <Button color="primary" onClick={this.handleButtonClick}>Get Jobs From Crawler</Button>
                <h1>Job List</h1>
                
                <div>

                {
                    this.state.joblist.map((jobDetails, index) =>  
                    {
                        console.log(jobDetails.data);
                        return jobDetails.data.map((col, idx) => 
                        (
                            <div key={idx}>
                                <p>{col}</p>
                            </div>
                        ));
                    }
                    
                )}
                    {/* <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid {...this.state.joblist} />
                        </div>
                    </div>                 */}
                </div>
            </div>
        );
    }
}