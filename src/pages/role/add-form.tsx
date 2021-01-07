import { Form } from 'antd';
import React, { Component } from 'react';

interface Props {
	setFrom: any;
}

interface State {}

export default class AddForm extends Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.props.setFrom(this.props.from);
  }
  

	render() {
		return <div>
      <Form>
        
      </Form>
    </div>;
	}
}
