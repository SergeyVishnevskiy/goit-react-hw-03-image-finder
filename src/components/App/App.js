import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import getImages from "../../service/Api";
import Loader from "react-loader-spinner";
import Modal from "../Modal/Modal";

class App extends Component {
  state = {
    perPage: 12,
    pageNumber: 1,
    inputValue: "",
    images: [],
    error: false,
    errorMessage: "",
    warning: false,
    modal: false,
    modalSrc: "",
    loader: false,
  };

  handleInput = ({ target }) => {
    this.setState({
      inputValue: target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      this.loadImages(true).then((images) => {
        if (images.length) {
          this.setState({
            pageNumber: 2,
            images: [...images],
            warning: false,
            loader: false,
            inputValue: "",
          });
        } else {
          this.setState({
            warning: true,
            images: [],
            loader: false,
          });
        }
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
  };

  loadImages = async (resetPages) => {
    if (this.state.inputValue) {
      this.setState({
        loader: true,
      });
      let { inputValue, pageNumber, perPage } = this.state;
      if (resetPages) {
        pageNumber = 1;
      }
      const results = await getImages(inputValue, pageNumber, perPage);
      let imagesArr = [];

      results.data.hits.forEach((image) => {
        const imageId = image.id;
        const bigImageUrl = image.largeImageURL;
        const smallImageUrl = image.webformatURL;
        const imageAlt = image.tags;
        imagesArr = [
          ...imagesArr,
          { imageId, bigImageUrl, smallImageUrl, imageAlt },
        ];
      });

      return imagesArr;
    } else return [];
  };

  loadMore = async () => {
    try {
      this.loadImages(false).then(async (images) => {
        this.setState((prevState) => ({
          pageNumber: prevState.pageNumber + 1,
          images: [...prevState.images, ...images],
          loader: false,
        }));
        this.scrollWindow();
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
  };

  openImage = ({ target }) => {
    this.setState({
      modal: true,
      modalSrc: target.dataset.big,
    });
  };

  closeModal = () => {
    this.setState({
      modal: false,
    });
  };

  scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - 965,
      behavior: "smooth",
    });
  };

  render() {
    const {
      inputValue,
      images,
      error,
      errorMessage,
      warning,
      modal,
      modalSrc,
      loader,
    } = this.state;

    if (error) {
      return <h1 className="message">{errorMessage}</h1>;
    }

    return (
      <>
        <SearchBar
          value={inputValue}
          onSubmit={this.handleSubmit}
          onInput={this.handleInput}
        />
        {warning && (
          <h1 className="message">No results for this search were found.</h1>
        )}
        <ImageGallery
          galleryItems={images}
          showImage={this.openImage}
          modalBool={modal}
          closeModal={this.closeModal}
          modalSrc={modalSrc}
        />
        {!loader && !!images.length && images.length % 12 === 0 && (
          <Button handleClick={this.loadMore} />
        )}
        {loader && (
          <div className="center">
            <Loader type="ThreeDots" color="#3f51b5" height={200} width={200} />
          </div>
        )}
        {modal && (
          <Modal
            source={modalSrc}
            closeModal={this.closeModal}
            name={modalSrc}
          />
        )}
      </>
    );
  }
}

export default App;
