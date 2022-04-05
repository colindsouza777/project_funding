import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // products: this.props.products
      id: "",
      vote: null,
    };
  }

  render() {
    const deposit = (event) => {
      event.preventDefault();
      const address = this.depositAddress.value;
      const price = window.web3.utils.toWei(
        this.depositPrice.value.toString(),
        "Ether"
      );
      this.props.deposit(address, price);
      if (this.props.loading != true) {
        this.state.products = this.props.products;
      }
    };

    const withdraw = (event) => {
      event.preventDefault();
      const address = this.withdrawAddress.value;
      var percent = this.percent.value;
      console.log(percent);
      if (this.state.vote == "yes") {
        percent = 0;
      } else {
        percent = 1;
      }
      this.props.withdraw(percent, "" + address);
      // if(this.props.loading != true){
      //   this.state.products = this.props.products;
      // }
    };

    return (
      <div id="content">
        {/* Project Id: {this.props.data[0]}
        Project Name: {this.props.data[1]}
        Project Id: {this.props.data[2]}
        Project Id: {this.props.data[3]}
        Project Id: {this.props.data[4]} */}
        <h1>Vote</h1>
        <form
          onSubmit={(event) => {
            withdraw(event);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.withdrawAddress = input;
              }}
              className="form-control"
              placeholder="Project Id"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.percent = input;
              }}
              className="form-control"
              placeholder="Vote"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Withdraw
          </button>
        </form>
        <p>&nbsp;</p>
        {/* <h2>Buy Product</h2> */}
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.state.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table> */}
      </div>
    );
  }
}

export default Main;
