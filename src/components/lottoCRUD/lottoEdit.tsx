// grabbing from Lotto Table, http://localhost:3000/:id, PUT(UPDATE)
import React from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

type AcceptedProps = {
    fetchLottos: any,
    token: any,
    lottos: [],
    // updateActive : boolean,
    lottoToUpdate: any,
    updateOff: any
}

type valueTypes = {
    editLottoNum: string,
    editNameOfLotto: string,
    editLottoPot: string,
    editLocation: string,
    editLottos: [],
}

export default class LottoEdit extends React.Component<AcceptedProps, valueTypes> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
            editLottoNum: this.props.lottoToUpdate.lottoNum,
            editNameOfLotto: this.props.lottoToUpdate.nameOfLotto,
            editLottoPot: this.props.lottoToUpdate.lottoPot,
            editLocation: this.props.lottoToUpdate.location,
            editLottos: [],
        }
    }

    lottoUpdate=(event: any) =>{
        event.preventDefault();
        fetch(`http://localhost:3000/lotto/${this.props.lottoToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                lottery:{
                    lottoNum: this.state.editLottoNum,
                    nameOfLotto: this.state.editNameOfLotto,
                    lottoPot: this.state.editLottoPot,
                    location: this.state.editLocation
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }),
        }).then((res)=>{
            this.props.fetchLottos();
            this.props.updateOff();
        })
    }


    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>To be updated</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.lottoUpdate}>
                        <FormGroup>
                            <Label htmlFor="editLottoNum">Edit Lotto Number:</Label>
                            <Input type="text" name="editLottoNum" value={this.state.editLottoNum} onChange={(event: any)=>this.setState({ editLottoNum: event.target.value})}/>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label htmlFor="editNameOfLotto">Edit Lotto Name:</Label>
                            <Input type="text" name="editNameOfLotto" value={this.state.editNameOfLotto} onChange={(event: any)=>this.setState({ editNameOfLotto: event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="editLottoPot">Edit Lotto Pot:</Label>
                            <Input type="text" name="editLottoPot" value={this.state.editLottoPot} onChange={(event: any)=>this.setState({ editLottoPot: event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="editLocation">Edit Location:</Label>
                            <Input type="text" name="editLocation" value={this.state.editLocation} onChange={(event: any)=>this.setState({ editLocation: event.target.value})}/>
                        </FormGroup>
                        <Button type="submit">Update!</Button>
                    </Form>
                </ModalBody>
            </Modal>

        );
    }

}