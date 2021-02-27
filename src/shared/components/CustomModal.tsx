import Modal from 'react-modal';
import React from 'react';

export class CustomModal extends React.Component<{ isOpen: boolean; labelHeader: string; labelHeaderColor: string; onClose: () => void }, {}> {
  constructor(props: { isOpen: boolean; labelHeader: string; labelHeaderColor: string; onClose: () => void }) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    Modal.setAppElement('#App');
  }

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <div className='ModalBookmarkForm'>
        <Modal isOpen={this.props.isOpen} onRequestClose={this.props.onClose} style={customStyles}>
          <h2 style={{ color: this.props.labelHeaderColor }}>{this.props.labelHeader}</h2>

          {this.props.children}
        </Modal>
      </div>
    );
  }
}
