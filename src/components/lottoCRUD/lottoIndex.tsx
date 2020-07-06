import React from 'react';

// import Sitebar from "./components/lottoCRUD/Sitebar";


type AcceptedProps = {
    token: string | any;
}

export default class LottoIndex extends React.Component<AcceptedProps> { 
    constructor(props: AcceptedProps){
        super(props);
    }
    render(){
        return(
            <div>
                          {/* <Sitebar clickLogout={this.clearToken} /> */}

                <h1>lotto</h1>
            </div>
        )
    }
}