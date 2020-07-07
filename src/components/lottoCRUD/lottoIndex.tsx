//Landing page for the rest of the lottoCRUD folder, GET, http://localhost:3000/lotto/
import React from "react";
import LottoCreate from './lottoCreate';
import LottoTable from './lottoTable';
import LottoEdit from './lottoEdit';
import {Container, Row, Col} from 'reactstrap';
import { timeStamp } from "console";

type acceptedProps = {
    token: string | any;

}

//HOUSING THE APPLICATION STATE
type valueTypes = {
    lottoNum: string,
    nameOfLotto: string,
    lottoPot: string,
    location: string,
    lottos: [],
    updateActive: boolean,
    lottoToUpdate: {},
}


export default class LottoIndex extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps){
        super(props);
        this.state = {
            lottoNum: '',
            nameOfLotto: '',
            lottoPot: '',
            location: '',
            lottos: [],
            updateActive: false,
            lottoToUpdate: {},
        };
    }

    //FETCHING ALL LOTTO DATA TO DISPLAY ON TABLE
    fetchLottos =() => {
        fetch('http://localhost:3000/lotto/', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(lottoData => {
            console.log(lottoData);
            this.setState({
                lottos: lottoData.lotteries,
            })
            console.log(this.state.lottos);
        })
    }
    
    componentWillMount(){
        console.log("will mount")
    }

    componentDidMount(){
        console.log("mounted");
        this.fetchLottos();
    }

    editUpdateLotto=(lotto: any)=>{
        this.setState({lottoToUpdate: lotto});
        console.log(lotto)
    }

    updateOn=()=>{
        this.setState({
            updateActive: true,
        })
    }

    updateOff=()=>{
        this.setState({
            updateActive: false,
        })
    }



    render() {
        return(
        <Container>
            <h1>Lotto index</h1> 
            <Row>
                <Col md="3">
                    <LottoCreate fetchLottos={this.fetchLottos} token={this.props.token}/>
                </Col>
            </Row>
            <Row>
                <Col md="9">
                    <LottoTable lottos={this.state.lottos} editUpdateLotto={this.editUpdateLotto} updateOn={this.updateOn} fetchLottos={this.fetchLottos} token={this.props.token}/>
                     {this.state.updateActive ?<LottoEdit lottoToUpdate={this.state.lottoToUpdate} updateOff={this.updateOff} lottos={this.state.lottos} fetchLottos={this.fetchLottos} token={this.props.token}/> : <></>}
                </Col>
            </Row>      
        </Container>
        );
    }
}



