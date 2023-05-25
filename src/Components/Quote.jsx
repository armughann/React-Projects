import React, { useEffect } from "react";
import { FaTwitterSquare, FaTumblrSquare, FaQuoteLeft } from "react-icons/fa";
import "./Quote.css";
import { useSelector, useDispatch } from "react-redux";

function Quote() {
  const quote = useSelector((state) => state.quote);
  const author = useSelector((state) => state.author);
  const color = useSelector((state) => state.color);
  const dispatch = useDispatch();

  const bgColor = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
  ];

  const getRandomColor = () => {
    const randomColor = bgColor[Math.floor(Math.random() * bgColor.length)];
    dispatch({ type: "SET_COLOR", payload: randomColor });
  };

  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "SET_QUOTE", payload: data.content });
        dispatch({ type: "SET_AUTHOR", payload: data.author });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
    document.querySelector("#new-quote").style.backgroundColor = color;
    document.querySelector("#tweet-quote").style.color = color;
    document.querySelector("#tumblr-quote").style.color = color;
    document.querySelector("#text").style.color = color;
    document.querySelector("#author").style.color = color;
  }, [color]);

  return (
    <div className="container-fluid">
      <div id="quote-box">
        <div className="row">
          <div id="text" className="col-lg-12">
            {quote && (
              <p>
                <FaQuoteLeft /> {quote}
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div id="author" className="col-ms-12">
            {author && <p>- {author}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <a id="tweet-quote" href="twitter.com/intent/tweet">
              <FaTwitterSquare size={60} />
            </a>
          </div>
          <div className="col-1">
            <a id="tumblr-quote" href="twitter.com/intent/tweet">
              <FaTumblrSquare size={60} />
            </a>
          </div>
          <div className="col-10">
            <button
              id="new-quote"
              className="btn btn-primary btn-lg border-0"
              onClick={() => {
                getQuote();
                getRandomColor();
              }}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
