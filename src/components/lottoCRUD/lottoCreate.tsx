//grabbing from lotto table, and the http://localhost:3000/lotto/, POST
import React from "react";
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
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
    lottoNum: string | any,
    nameOfLotto: string,
    lottoPot: string,
    location: string | any,
    lottos: [],
    locationTable: []
}


export default class LottoCreate extends React.Component<AcceptedProps, valueTypes> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
            lottoNum: 
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) , 
            numberHolder: '',
            
            nameOfLotto: '',
            lottoPot: '',
            location: '',
            lottos: [],
            locationTable: [],
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
                lottoNum: 
                    Math.floor(Math.random() * 49 + 1) + 
                    "-" +
                    Math.floor(Math.random() * 49 + 1) +
                    "-" +
                    Math.floor(Math.random() * 49 + 1) +
                    "-" +
                    Math.floor(Math.random() * 49 + 1) +
                    "-" +
                    Math.floor(Math.random() * 49 + 1) +
                    "-" +
                    Math.floor(Math.random() * 49 + 1),
            });
            this.setState({
                nameOfLotto: '',
                lottoPot: '',
                // location: '',
                lottos: [],
            });
            this.setState({
                location: '',
            });
            
            console.log(this.state.lottos);
        })
    }

    generateRandomNumber = () => {
    //     // var randomNumber = Math.floor(Math.random() * 900000 + 100000);
        this.setState({
            numberHolder: 
                Math.floor(Math.random() * 49 + 1) + 
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1) +
                "-" +
                Math.floor(Math.random() * 49 + 1),
        })
    }

    
    //FETCHING ALL DESTINATION DATA TO DISPLAY ON TABLE
    fetchLocations =() => {
        fetch('http://localhost:3000/destination/', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(locationData => {
            this.setState({
                locationTable: locationData.destinations,
            })
            console.log("Showing location",this.state.locationTable);
        })
    }

    locationMapper =() => {
        return this.state.locationTable.map((location: any, index: any) => {
            return(
                <ul key={index}>
                    <li>{location.lottoLocation}</li>
                    <li>{location.lottoAddress}</li>
                </ul>
            )
        })
    }

    componentWillMount(){
        console.log("will mount")
    }

    componentDidMount(){
        console.log(this.fetchLocations());
        console.log(this.locationMapper());
        this.fetchLocations();
        this.locationMapper();

    }

    render(){

        return (
            <>
                <h3>LottoCreate</h3>

                    <Button id="random-number-btn" type='submit' onClick={this.generateRandomNumber}><p>Click on this Slot!!</p><img id="slot" src={Slot2} alt=""/>
                    <br></br>
                        {/* <p>
                            <Input id="lottoNum" name="lottoNum" value={this.state.numberHolder} />
                        </p> */}
                    </Button>

                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="lottoNum"> Lotto Number: </Label>
                        <Input id="lottoNum" name="lottoNum" value={this.state.numberHolder} onChange={(event: any)=>this.setState({ lottoNum: event.target.value})}/>
                        {/* <Label htmlFor="lottoNum"> Lotto Number: </Label>
                        <Input id="lottoNum" name="lottoNum" value={this.state.lottoNum} onChange={(event: any)=>this.setState({ lottoNum: event.target.value})}/>  */}
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
                        <Label htmlFor="lottoPot">Location (select): </Label>
                        <Input type="select" name="location" value={this.state.location} onChange={(event: any)=>this.setState({location: event.target.value})}>
                            {this.state.locationTable.map((location:any, index: any) => (
                                <option key={index}>
                                    {location.lottoLocation} : {location.lottoAddress}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Input type="submit"value="Add to Lotto History"/>
                </Form>

            </>
        )
    }
}

