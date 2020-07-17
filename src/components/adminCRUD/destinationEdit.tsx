import React from "react";
import {
  FormGroup,
  Modal,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
  ModalHeader,
} from "reactstrap";


import "./destinationEdit.css";


import APIURL from "../../helpers/environment";

type acceptedProps = {
  updateOff: any;
  token: any;
  fetchDestination: any;
  setUpdateLoco: any;
};

type valueTypes = {
  editLocation: string | any;
  editAddress: string | any;
};

export default class DestinationUpdate extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      editLocation: this.props.setUpdateLoco.lottoLocation,
      editAddress: this.props.setUpdateLoco.lottoAddress,
    };
  }

  handleSubmit = (event: any) => {
    console.log(event);
    event.preventDefault();
    fetch(`${APIURL}/destination/${this.props.setUpdateLoco.id}`, {
      method: "PUT",
      body: JSON.stringify({
        destination: {
          lottoLocation: this.state.editLocation,
          lottoAddress: this.state.editAddress,
        },
      }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    }).then((res) => {
      console.log(res);
      this.props.fetchDestination();
      this.props.updateOff();
    });
  };
  //if setUpdateActive is true then dont open the modal
  render() {
    return (
      <Modal id="locationedit-modal" isOpen={true}>
        <ModalHeader id="locationedit-edit-header">Edit Location</ModalHeader>
        <ModalBody id="locationedit-modal-body">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="lottoLocation" id="locationedit-text">
                Edit Location Name
              </Label>
              <Input id="locationedit-input"
                name="lottoLocation"
                value={this.state.editLocation}
                onChange={(e) =>
                  this.setState({ editLocation: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lottoAddress" id="locationedit-text">
                Edit Address
              </Label>
              <Input id="locationedit-input"
                name="lottoAddress"
                value={this.state.editAddress}
                onChange={(e) => this.setState({ editAddress: e.target.value })}
              />
            </FormGroup>
            <button id="locationedit-button" type="submit">Update Location</button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
