//grabbing from lotto table, and the http://localhost:3000/lotto/, POST
import React, {useState, useEffect} from "react";

//number needs to be generated
export default class LottoCreate extends React.Component<{}> {
    constructor(props: {}){
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
}