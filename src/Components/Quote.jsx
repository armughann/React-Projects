import React, { useEffect, useState } from "react";
import { FaTwitterSquare, FaTumblrSquare, FaQuoteLeft } from "react-icons/fa";
import "./Quote.scss";
import { useSelector, useDispatch } from "react-redux";

function Quote() {
  const [fade, setFade] = useState(false);
  const quote = useSelector((state) => state.quote);
  const author = useSelector((state) => state.author);
  const color = useSelector((state) => state.color);
  const dispatch = useDispatch();

  const getRandomColor = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var randomColor = `rgb(${x}, ${y}, ${z})`;
    dispatch({ type: "SET_COLOR", payload: randomColor });
  };

  const getQuote = () => {
    setFade(true); // Start the fade-out effect
    setTimeout(() => {
      fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch({ type: "SET_QUOTE", payload: data.content });
          dispatch({ type: "SET_AUTHOR", payload: data.author });
          getRandomColor(); // Update the background color
          setFade(false); // Start the fade-in effect
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 500); // Set the delay to match the CSS transition time
  };

  useEffect(() => {
    document.body.style.transition = "background-color 0.5s ease-in-out";
    document.body.style.backgroundColor = fade ? "transparent" : color;
    document.body.style.color = fade ? "transparent" : color;
    document.getElementById("new-quote").style.backgroundColor = fade ? "transparent" : color;
    // document.getElementById("new-quote").style.color = fade ? "transparent" : "white";
    document.getElementById("tweet-quote").style.color = fade ? "transparent" : color;
    document.getElementById("tumblr-quote").style.color = fade ? "transparent" : color;
  }, [color, fade]);

  return (
    <div className="container">
      <div id="quote-box">
        <div className={'row justify-content-center'}>
          <div id="text" className={`col-xl-10 ${fade ? 'fade-out' : 'fade-in'}`}>
            {quote && (
              <p>
                <FaQuoteLeft /> {quote}
              </p>
            )}
          </div>
        </div>
        <div className={'row justify-content-center'}>
          <div id="author" className={`col-sm-10 ${fade ? 'fade-out' : 'fade-in'}`}>
            {author && <p>- {author}</p>}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2">
            <a id="tweet-quote" href="twitter.com/intent/tweet">
              <FaTwitterSquare size={60} />
            </a>
          </div>
          <div className="col-2">
            <a id="tumblr-quote" href="twitter.com/intent/tweet" target="_blank">
              <FaTumblrSquare size={60} />
            </a>
          </div>
          <div className="col-sm-8">
            <button
              id="new-quote"
              className="btn btn-primary btn-lg border-0"
              onClick={() => {
                getQuote();
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
