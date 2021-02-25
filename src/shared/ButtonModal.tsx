import React from 'react';
import { Button, Modal } from 'react-materialize';

export default class ButtonModal extends React.Component<
  {
    labelButton: string;
    labelHeader: string;
    isOpen?: boolean | undefined;
    onClose?: () => void;
    onOpen?: () => void;
  },
  {}
> {
  constructor(props: {
    labelButton: string;
    labelHeader: string;
    isOpen: boolean;
    onClose?: () => void;
    onOpen?: () => void;
  }) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Modal
        actions={[null]}
        bottomSheet={false}
        fixedFooter={false}
        header={this.props.labelButton}
        id='Modal-0'
        open={this.props.isOpen}
        options={{
          dismissible: true,
          endingTop: '10%',
          inDuration: 250,
          onCloseEnd: this.props.onClose,
          onCloseStart: undefined,
          onOpenEnd: this.props.onOpen,
          onOpenStart: undefined,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: '4%',
        }}
        trigger={<Button node='button'>{this.props.labelButton}</Button>}
      >
        {this.props.children}
      </Modal>
    );
  }
}
