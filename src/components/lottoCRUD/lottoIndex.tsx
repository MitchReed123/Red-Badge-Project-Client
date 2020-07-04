//Landing page for the rest of the lottoCRUD folder, GET, http://localhost:3000/lotto/
import React, { Component, useState, useEffect } from "react";
import LottoCreate from "./lottoCreate";
import LottoTable from "./lottoTable";
import LottoEdit from "./lottoEdit";
// import {Container, Row, Col} from 'reactstrap';
type acceptedProps = {
  token: string | any;
};
type valueTypes = {
  lottoNum: string;
  nameOfLotto: string;
  lottoPot: string;
  location: string;
  dataTable: [];
};
export default class LottoIndex extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      lottoNum: "",
      nameOfLotto: "",
      lottoPot: "",
      location: "",
      dataTable: [],
      //owner_id: '',
      //userId: '', //???
    };
  }
  componentWillMount() {
    console.log("will mount");
  }
  componentDidMount() {
    fetch("http://localhost:3000/lotto/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((lottoData) => {
        console.log(lottoData);
        this.setState({
          dataTable: lottoData,
        });
        console.log(this.state.dataTable); //able to set 'data' for all columns names?
      });
  }
  render() {
    return (
      <div>
        <h1>Lotto index</h1>
        <LottoCreate />
        <LottoTable />
        <LottoEdit />
      </div>
    );
  }
}
