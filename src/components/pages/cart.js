"use strict"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    };

    onDelete(_id) {
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex(
            function (cart) {
                return cart._id === _id;
            }
        )
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete + 1)]

        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1);
    }
    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCart(_id, -1);
        }
    }

    open() {
        this.setState({ showModal: true })
    }
    close() {
        this.setState({ showModal: false })
    }

    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }

    renderEmpty() {
        return (
            <div></div>
        );
    }

    renderCart() {
        const cartItemList = this.props.cart.map(function (cartArr) {
            console.log("cart arr on tama: ", cartArr);
            return (
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>euro. {cartArr.price}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success"
                            >{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{ minWidth: '300px' }}>
                                <Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</Button>
                                <Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this, cartArr._id)} > +</Button>
                                <span>     </span>
                                <Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this, cartArr._id)}>DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            );
        }, this)
        return (
            <Panel header="Cart" bsStyle="primary">
                {cartItemList}
                <Row>
                    <Col xs={12}>
                        <h6>Total amount:</h6>
                        <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                            PROCEED TO CHECKOUT
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Yor order has been saved</h6>
                        <p>You will receive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}></Col>
                        <h6>Total €</h6>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart
    }, dispatch)
}

function mapStateToProps(state) {
    console.log("state on tama: ", state);
    return {
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);