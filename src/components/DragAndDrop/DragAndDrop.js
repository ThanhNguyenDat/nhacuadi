import React, { useState } from "react";
import { getAnswers, getSentence } from "../../utils/helpers";
import SentenceBox from "./SentenceBox";

export const DragAndDrop = ({ sequences }) => {
    const [state, setState] = useState({
        showResults: false,
        question: "",
        answers: getAnswers(sequences),
        sentence: getSentence(sequences),
    });

    const onDrop = (e, dropId) => {
        const text = e.dataTransfer.getData("text/plain");

        const sentence = state.sentence.map((word) => {
            if (word.id === dropId) {
                return { ...word, placed: true, displayed: text };
            }
            return word;
        });
        setState({ ...state, sentence });
    };

    const test = () => {
        setState({ ...state, showResults: !state.showResults });
    };

    const { showResults } = state;

    return (
        <div>
            <SentenceBox
                marked={showResults}
                onDrop={onDrop}
                sentence={state.sentence}
            />

            {/* <AnswerBox answers={state.answers} /> */}
        </div>
    );
};
