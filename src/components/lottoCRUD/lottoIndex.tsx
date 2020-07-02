//Landing page for the rest of the lottoCRUD folder, GET, http://localhost:3000/lotto/
import React, {Component, useState, useEffect} from "react";
import LottoCreate from './lottoCreate';
import LottoTable from './lottoTable';
import LottoEdit from './lottoEdit';
// import {Container, Row, Col} from 'reactstrap';

export default class LottoIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lottoNum: '',
            nameOfLotto: '',
            lottoPot: '',
            location: '',
            owner_id: '',
            userId: '', //???
        }
    }

    componentWillMount(){
        console.log("will mount")
    }

    componentDidMount() {
        fetch('http://localhost:3000/lotto/', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                // 'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                data: json.data,
            })
            console.log(this.state.data);//able to set 'data' for all columns names?
        })
    }

    render() {
        return(
        <div>
            <h1>Lotto Index</h1>
            <LottoCreate/>
            <LottoTable/>
            <LottoEdit/>
        </div>
        );
    }
}



