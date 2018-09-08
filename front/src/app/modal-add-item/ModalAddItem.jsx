import React, { PureComponent } from 'react';
import Input from '../common/input/Input';
import * as api from '../api/api';
import './ModalAddItem.less';
import AppStore from '../../store/AppStore';

export default class ModalAddItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
    };

    this.submit = this.submit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDesc = this.changeDesc.bind(this);
  }

  submit() {
    const { name, desc } = this.state;

    api.sendNewItem(name, desc)
      .then((result) => {
        AppStore.closeModalAddNewItem();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeName(str) {
    this.setState({ name: str });
  }

  changeDesc(str) {
    this.setState({ desc: str });
  }

  render() {
    const { name, desc } = this.state;

    return (
      <div className="modal-add-item">
        <h2 className="title">Add new Item</h2>

        <p className="caption t-medium">Name:</p>
        <Input
          className="input-name"
          autofocus={true}
          onValidate={(str) => str.length > 0}
          onChange={this.changeName}
          onSubmit={() => { }}
        />

        <p className="caption t-medium">Description:</p>
        <Input
          className="input-desc"
          autofocus={false}
          onValidate={(str) => str.length > 0}
          onChange={this.changeDesc}
          onSubmit={() => { }}
        />

        <button
          className="add-item btn"
          disabled={name.length === 0 || desc.length === 0}
          onClick={this.submit}
        >Add</button>
      </div>
    );
  }
};