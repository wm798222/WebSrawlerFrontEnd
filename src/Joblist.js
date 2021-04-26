import React, { Component, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

export default class Joblist extends Component {
    
    constructor() {
        super();
        this.state = {
            joblist: ["not yet gotten"],
            selectionModel: [],
            rows: [],
            addedRows : []
        }        
    };
    
    handleButtonClick = () => {
        this.loadJobs();
    };

    async loadJobs() {
        const promise = await axios.get("/getJobList");
        const status = promise.status;
        if(status===200)
        {
          const data = promise.data;
          this.setState({joblist:data});
        }
    }

    render() {
        // const renObjData = this.state.joblist.map(function(data, idx) {
        //     return (
        //         <div>
        //             <p>{data.id}</p> <p>{data.company}</p> <p>{data.positionname}</p>
        //         </div>
        //     );
        // });

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'jobID', headerName: 'jobID', width: 130 },
            { field: 'company', headerName: 'Company Name', width: 130 },
            { field: 'positionname', headerName: 'Position Name', width: 450 },
            {
              field: 'summary',
              headerName: 'Summary',
              width: 1000,
            },
          ];
          
        const rows = [];

        this.state.joblist.map(function(data, idx) {
            rows.push({ id: idx, jobID: data.id, company: data.company, positionname: data.positionname, summary: data.summary});
        });

        // reference: https://stackoverflow.com/questions/64232909/how-to-delete-a-specific-row-in-material-ui-datagrid-reactjs
        const handleRowSelection = (e) => {
            this.setState({addedRows : [...this.state.addedRows, ...rows.filter((r) => r.id === e.data.id)]});
          };
        
          const handleClickToAdd = () => {
            // send post request to backend
            if (this.state.addedRows.length === 0) {
                alert("Please select the jobs to add");
            } else {
                var idList = [];
                for (var i = 0; i < this.state.addedRows.length; i++) {
                    idList.push(this.state.addedRows[i].jobID);
                }
                alert(idList);
                axios.post('http://localhost:5000/addJobs ', idList)
                    .then((response) => {
                    console.log(response);
                    }, (error) => {
                    console.log(error);
                    });
            }
            
          };

        return (
            <div>
                <Button color="primary" onClick={this.handleButtonClick}>Get Jobs From Crawler</Button>
                <h1>Job List</h1>
                <div style={{ height: 1000, width: '100%' }}>
                    <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    checkboxSelection 
                    onSelectionModelChange={(newSelection) => {
                        this.setState(newSelection.selectionModel);
                    }}
                    selectionModel={this.state.selectionModel}
                    onRowSelected={handleRowSelection}
                    />
                </div>
                <br />
                <Button variant="contained" color="primary" onClick={handleClickToAdd}>
                    Add Selected Jobs
                </Button>
            </div>
        );
    }
}