//grabbing from lotto table, and the http://localhost:3000/lotto/, POST
import React from "react";
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import Slot2 from '../../assets/Slot2.png'
import "../lottoCRUD/lottoCreate.css";


// number needs to be generated

type AcceptedProps = {
    token: string | any;
    fetchLottos: any;
    // updateLottoNum: React.ReactNode;
    // updateNameOfLotto:  any,
    // updateLottoPot:  any,
    // updateLocation:  any
}

type valueTypes = {
    numberHolder: number | any,
    lottoNum: string,
    nameOfLotto: string,
    lottoPot: string,
    location: string,
    lottos: []
}


export default class LottoCreate extends React.Component<AcceptedProps, valueTypes> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
            numberHolder: '',
            lottoNum: '',
            nameOfLotto: '',
            lottoPot: '',
            location: '',
            lottos: [],
        }
    }

    handleSubmit = (event: any)=>{
        console.log(this.state.lottoNum, this.state.nameOfLotto, this.state.lottoPot, this.state.location);
        event.preventDefault();
        fetch(`http://localhost:3000/lotto/`, {
            method: "POST",
            body: JSON.stringify({

                    lottoNum: this.state.lottoNum,
                    nameOfLotto: this.state.nameOfLotto,
                    lottoPot: this.state.lottoPot,
                    location: this.state.location

            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }),
        }).then((res)=>res.json())
        .then((lottoData) => {
            console.log(lottoData);
            this.setState({
                lottoNum: '',
                nameOfLotto: '',
                lottoPot: '',
                location: '',
                lottos: [],
            })
            
            console.log(this.state.lottos);
        })
    }

    generateRandomNumber = () => {
        // var randomNumber = Math.floor(Math.random() * 900000 + 100000);
        this.setState({numberHolder: Math.floor(Math.random() * 900000 + 100000)})
    }



    render(){

        return (
            <>
                <h3>LottoCreate</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Button id="random-number-btn" type='submit' onClick={this.generateRandomNumber}><p>Click on this Slot <br></br>to Get Your Lucky number!!</p><img id="slot" src={Slot2} alt=""/><p>
                        <Input id="lottoNum" name="lottoNum" value={this.state.numberHolder} /></p>
                    </Button>
                    <FormGroup>
                        <Label htmlFor="lottoNum"> Lotto Number: </Label>
                        <Input name="lottoNum" value={this.state.lottoNum} onChange={(event: any)=>this.setState({ lottoNum: event.target.value})}/> 
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="nameOfLotto"> Lotto Name: </Label>
                        <Input name="nameOfLotto" value={this.state.nameOfLotto} onChange={(event: any)=>this.setState({nameOfLotto: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lottoPot">Lotto Pot: </Label>
                        <Input name="lottoPot" value={this.state.lottoPot} onChange={(event: any)=>this.setState({lottoPot: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="location">Location: </Label>
                        <Input name="location" value={this.state.location} onChange={(event: any)=>this.setState({location: event.target.value})}/>
                    </FormGroup>
                    <Input type="submit"value="Add to Lotto History"/>
                </Form>

            </>
        )
    }
}

