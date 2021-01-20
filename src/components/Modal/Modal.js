import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reset: false,
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.closeByEscape);
    document
      .querySelector(".Overlay")
      .addEventListener("click", this.closeByOverlay);
    document.querySelector("body").style.overflow = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeByEscape);
    document
      .querySelector(".Overlay")
      .removeEventListener("click", this.closeByOverlay);
    document.querySelector("body").style.overflow = "unset";
    this.setState({
      reset: true,
    });
  }

  closeByEscape = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };

  closeByOverlay = (e) => {
    if (e.target.nodeName !== "IMG") {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className="Overlay">
        <div className="Modal">
          <img
            src={this.state.reset ? "" : this.props.source}
            alt={this.state.reset ? "" : this.props.name}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
