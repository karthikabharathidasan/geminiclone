import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <main className="main">
            <div className="main__content-wrapper">
                <nav className="main__nav">
                    <p className="main__title">Gemini</p>
                    <img className="main__user-icon" src={assets.user_icon} alt="User Profile" />
                </nav>
                <section className="main__container">
                    {!showResult ? (
                        <>
                            <div className="main__greeting">
                                <p><span>Hello, Dev.</span></p>
                                <p>How can I help you today?</p>
                            </div>
                            <div className="main__cards">
                                <article className="main__card">
                                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                                    <img className="main__card-icon" src={assets.compass_icon} alt="Compass" />
                                </article>
                                <article className="main__card">
                                    <p>Briefly summarize this concept: urban planning</p>
                                    <img className="main__card-icon" src={assets.bulb_icon} alt="Light Bulb" />
                                </article>
                                <article className="main__card">
                                    <p>Brainstorm team bonding activities for our work retreat</p>
                                    <img className="main__card-icon" src={assets.message_icon} alt="Message Bubble" />
                                </article>
                                <article className="main__card">
                                    <p>Improve the readability of the following code</p>
                                    <img className="main__card-icon" src={assets.code_icon} alt="Code Icon" />
                                </article>
                            </div>
                        </>
                    ) : (
                        <div className="result">
                            {/* Render the result data here */}
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <div className="result-data">
                                    {/* Gemini and user icons side by side */}
                                    <div className="result-icons">
                                        <img src={assets.gemini_icon} alt="Gemini Icon" className="result-icon" />
                                        <img src={assets.user_icon} alt="User Icon" className="result-icon" />
                                    </div>
                                    {/* Sanitize and render resultData safely */}
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>

            <div className="main__bottom">
                <div className="main__search-box">
                    <label htmlFor="prompt-input" className="main__search-label">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            id="prompt-input"
                            placeholder="Enter a prompt here"
                            className="main__search-input"
                        />
                    </label>
                    <div className="main__bottom-icons">
                        <img src={assets.gallery_icon} alt="Gallery Icon" className="main__bottom-icon" />
                        <img src={assets.mic_icon} alt="Microphone Icon" className="main__bottom-icon" />
                        {input?<img onClick={() => onSent(input)} // Pass the input to onSent
                            src={assets.send_icon}
                            alt="Send Icon"
                            className="main__bottom-icon"
                        />:null}
                    </div>
                </div>
                <p className="main__bottom-info">
                    Gemini may display inaccurate info, including about people, so double check its responses.
                </p>
            </div>
        </main>
    );
};

export default Main;
