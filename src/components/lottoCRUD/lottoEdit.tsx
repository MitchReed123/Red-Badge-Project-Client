// grabbing from Lotto Table, http://localhost:3000/:id, PUT(UPDATE)
import React from "react";
import {
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import APIURL from "../../helpers/environment";
type acceptedProps = {
  updateOff: any;
  token: any;
  fetchLottos: any;
  setUpdateLotto: any;
};

type valueTypes = {
  editLottoName: string | any;
  editLottoPot: string | any;
  editLottoLoco: string | any;
};

export default class LottoEdit extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      editLottoName: this.props.setUpdateLotto.nameOfLotto,
      editLottoPot: this.props.setUpdateLotto.lottoPot,
      editLottoLoco: this.props.setUpdateLotto.location,
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`${APIURL}/lotto/${this.props.setUpdateLotto.id}`, {
      method: "PUT",
      body: JSON.stringify({
        lottery: {
          nameOfLotto: this.state.editLottoName,
          lottoPot: this.state.editLottoPot,
          location: this.state.editLottoLoco,
        },
      }),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: this.props.token,
      }),
    }).then((res) => {
      this.props.fetchLottos();
      this.props.updateOff();
    });
  };
  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Edit a Lotto</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label htmlFor="nameOfLotto">Edit a Lotto Name</Label>
              <Input
                name="nameOfLotto"
                value={this.state.editLottoName}
                onChange={(e) =>
                  this.setState({ editLottoName: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lottoPot">Edit a Lotto Pot</Label>
              <Input
                name="lottoPot"
                value={this.state.editLottoPot}
                onChange={(e) =>
                  this.setState({ editLottoPot: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="location">Edit Lotto Location</Label>
              <Input
                name="location"
                value={this.state.editLottoLoco}
                onChange={(e) =>
                  this.setState({ editLottoLoco: e.target.value })
                }
              />
            </FormGroup>
            <Button type="submit">Update Lotto</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
