import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import classNames from "classnames";
import style from "./style.css";
import { debounce } from "../../../utils";

const SearchItem = ({
  itemData,
  onItemSelect,
  renderItem,
  addedClassName,
  onMouseEnter,
}) => (
  <div
    className={classNames(style.searchItem, addedClassName)}
    onMouseUp={onItemSelect}
    onMouseEnter={onMouseEnter}
  >
    {renderItem(itemData)}
  </div>
);

class AutocompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchResults: [],
      serachValue: "",
      focusedItem: -1,
      showResults: true,
    };
    this.handleOnKeyDown = ::this.handleOnKeyDown;
    this.debouncedFecthing = debounce(::this.fetchData, 200);
  }

  componentDidMount() {
    const { searchableKey, defaultValue, autoFocus } = this.props;

    if (autoFocus) {
      document.addEventListener("keydown", this.handleOnKeyDown);
    } else {
      this.elementRef.addEventListener("keydown", this.handleOnKeyDown);
    }

    if (defaultValue) {
      this.props
        .searchPromise(defaultValue)
        .then((res) => {
          if (res.data.length == 1 && res.data[0].username == defaultValue) {
            ::this.onItemSelect(res.data[0])();
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.setState({ serachValue: defaultValue });
    }
  }

  onItemSelect(item) {
    return () => {
      this.setState({
        searchResults: [],
        serachValue: item[this.props.searchableKey],
      });
      this.props.onItemSelect(item);
    };
  }

  onInputFocus() {
    this.setState({ showResults: true });
  }

  handleSearchChange(e, { value }) {
    if (value.length < 2) {
      this.setState({
        isLoading: false,
        searchResults: [],
        serachValue: value,
      });
    } else {
      this.setState({ isLoading: true, serachValue: value });

      this.debouncedFecthing(value);
    }
  }

  fetchData(value) {
    this.props
      .searchPromise(value)
      .then((res) => {
        this.setState({ isLoading: false, searchResults: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleOnKeyDown(e) {
    const { serachValue, focusedItem, searchResults } = this.state;
    if (this.inputElementRef !== document.activeElement) {
      this.inputElementRef.focus();
    }

    if (e.keyCode == 13) {
      if (focusedItem >= 0) {
        this.onItemSelect(searchResults[focusedItem])();
      }
    } else {
      // down
      if (e.keyCode == 40) {
        // For include -1 in the cirlce
        const nextFocused =
          ((focusedItem + 2) % (searchResults.length + 1)) - 1;
        this.setState({ focusedItem: nextFocused });
      }
      // up
      if (e.keyCode == 38) {
        const nextFocused =
          focusedItem >= 0 ? focusedItem - 1 : searchResults.length - 1;
        this.setState({ focusedItem: nextFocused });
      }
    }
  }

  render() {
    const { renderItem } = this.props;
    const {
      serachValue,
      searchResults,
      isLoading,
      focusedItem,
      showResults,
    } = this.state;

    return (
      <div
        ref={(e) => (this.elementRef = e)}
        style={{ display: "inline-block" }}
        onMouseLeave={() => this.setState({ focusedItem: -1 })}
        onBlur={() => {
          setTimeout(() => this.setState({ showResults: true }), 500);
        }}
      >
        <Input
          ref={(e) => (this.inputElementRef = e)}
          placeholder="Search..."
          style={{ marginBottom: "2px" }}
          onChange={::this.handleSearchChange}
          value={serachValue}
          results={searchResults}
          loading={isLoading}
          onFocus={::this.onInputFocus}
          icon="search"
        />
        {showResults &&
          searchResults.map((item, index) => (
            <SearchItem
              addedClassName={
                focusedItem == index ? style.focusedSearchItem : null
              }
              key={index}
              refkey={index}
              itemData={item}
              renderItem={renderItem}
              onMouseEnter={() => this.setState({ focusedItem: index })}
              onItemSelect={::this.onItemSelect(item)}
            />
          ))}
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.autoFocus) {
      document.removeEventListener("keydown", this.handleOnKeyDown);
    } else {
      this.elementRef.removeEventListener("keydown", this.handleOnKeyDown);
    }
  }
}

export default AutocompleteInput;
