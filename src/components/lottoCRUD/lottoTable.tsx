// DELETE, http://localhost:3000/:id, this is where we put together the table, this will have a mapper on it
import React from "react";
import { Table, Button, Row, Col } from 'reactstrap';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


type AcceptedProps = {
    fetchLottos: any,
    token: any,
    lottos: [],
    editUpdateLotto: any,
    updateOn: any,
    // updateActive : boolean,
}

type valueTypes = {
    lottoNum: string,
    nameOfLotto: string,
    lottoPot: string,
    location: string,
    lottos: [],
}

export default class LottoTable extends React.Component<AcceptedProps, valueTypes> {
    constructor(props:AcceptedProps){
        super(props);
        this.state = {
            lottoNum: '',
            nameOfLotto: '',
            lottoPot: '',
            location: '',
            lottos: [],
        }
    }

    deleteLotto = (lotto: any) => {
        fetch(`http://localhost:3000/lotto/${lotto.id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchLottos())
    }

    lottoMapper = () => {
        return this.props.lottos.map((lotto: any, index) => {
            return (
                <tr key={index}>
                    <th >{lotto.id}</th>
                    <td>{lotto.lottoNum}</td>
                    <td>{lotto.nameOfLotto}</td>
                    <td>{lotto.lottoPot}</td>
                    <td>{lotto.location}</td>
                    <td>
                        <Button onClick={() => { this.props.editUpdateLotto(lotto); this.props.updateOn(); } }><EditIcon /></Button>
                        <Button onClick={() => { this.deleteLotto(lotto); } }><DeleteIcon /></Button>
                    </td>
                </tr>
            );
        })
    }

    componentWillMount(){
        console.log("will mountt/lottoTable");
    }

    componentDidMount(){
        console.log("did mount/lottoTable");
        this.lottoMapper();
        console.log(this.lottoMapper());
    }

    render() {
        return(
        <div className="">
            <h1>Lotto History</h1>
            <hr/>
            <Row>
                <Col>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Lotto number</th>
                        <th>Lotto name</th>
                        <th>Lotto pot</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {this.lottoMapper()}
                </tbody>
            </Table>
            </Col>
            </Row>

        </div>

        );
    }
}
