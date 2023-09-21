import React, {
    useCallback,
    useState,
    useEffect,
    useRef,
    useMemo,
} from "react";
import { InputAnswer } from "../Inputs/InputAnswer";

export const ParagraphAnswer = ({ sequences }) => {
    const words = useMemo(
        () =>
            sequences.split(" ").map((word) => {
                const type =
                    word.charAt(0) === "<" && word.at(-1) === ">"
                        ? "blank"
                        : "text";
                const text =
                    type === "blank"
                        ? word.replace("<", "").replace(">", "")
                        : word;

                return {
                    type,
                    text,
                    // length: text.length, // optional
                };
            }),
        []
    );

    const inputRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleKeyDown = (e) => {
        if (
            e.shiftKey === false &&
            (e.code === "Space" ||
                e.key === " " ||
                e.code === "Tab" ||
                e.key === "Tab")
        ) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của phím cách
            setActiveIndex((prevIndex) => {
                var nextIndex = prevIndex + 1;
                // find next index if inputRefs.current[nextIndex] !== undefind
                while (inputRefs.current[nextIndex] === undefined) {
                    nextIndex++;
                    if (nextIndex >= inputRefs.current.length) {
                        break;
                    }
                }
                if (nextIndex < inputRefs.current.length) {
                    return nextIndex;
                }

                return prevIndex;
            });
        }

        if (
            e.shiftKey === true &&
            (e.code === "Space" ||
                e.key === " " ||
                e.code === "Tab" ||
                e.key === "Tab")
        ) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của phím cách
            setActiveIndex((prevIndex) => {
                var nextIndex = prevIndex - 1;
                while (inputRefs.current[nextIndex] === undefined) {
                    nextIndex--;
                    if (nextIndex <= 0) {
                        break;
                    }
                }
                if (nextIndex >= 0) {
                    return nextIndex;
                }
                return prevIndex;
            });
        }
    };

    const handleInputClick = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    useEffect(() => {
        if (inputRefs.current[activeIndex]) {
            inputRefs.current[activeIndex].focus();
        }
    }, [activeIndex, inputRefs]);

    return (
        <div className="paragraph">
            {words.map((word, index) => (
                <InputAnswer
                    ref={(el) =>
                        word.type?.includes("blank")
                            ? (inputRefs.current[index] = el)
                            : undefined
                    }
                    key={index}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => handleInputClick(index)}
                    {...word}
                />
            ))}
        </div>
    );
};
