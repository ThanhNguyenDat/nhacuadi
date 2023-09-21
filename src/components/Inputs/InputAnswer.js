import React from "react";
import { InputFillInBlank } from "./InputFillInBlank";

export const InputAnswer = React.forwardRef(
    ({ className, type, length, text, ...props }, ref) => {
        const cn = `${className ? className : ""} input-answer`.trim();
        return type.includes("blank") ? (
            <InputFillInBlank
                ref={ref}
                className={cn}
                text={text}
                length={length}
                {...props}
            />
        ) : (
            <div className={cn} ref={ref}>
                <p
                    className="responsive-typography dol dol-typo"
                    style={{
                        margin: "0px",
                        fontWeight: "400",
                        lineHeight: "28px",
                        fontSize: "20px",
                        color: "rgb(36, 41, 56)",
                    }}
                >
                    <span>{text}</span>
                </p>
            </div>
        );
    }
);
