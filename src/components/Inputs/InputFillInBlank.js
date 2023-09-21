import React, { useMemo, useState } from "react";
import "./styles.scss";

export const InputFillInBlank = React.forwardRef(
    ({ className, style, text, length, onKeyDown, onClick }, ref) => {
        const [value, setValue] = useState("");

        const minWidth = useMemo(() => {
            const width = length ?? text?.length ?? 0;
            return `${width * 10 + 12}px`;
        }, []);

        return (
            <div
                className={`${className} input-fill-in-blank blank untouched`}
                style={{
                    position: "relative",
                    ...style,
                }}
            >
                <div className="input" style={{ display: "inline-block" }}>
                    <input
                        ref={ref}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        onKeyDown={onKeyDown}
                        onClick={onClick}
                        style={{
                            boxSizing: "content-box",
                            width: `${value.length * 11 + 3}px`,
                            minWidth: minWidth,
                            padding: 0,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            visibility: "hidden",
                            height: "0px",
                            overflow: "scroll",
                            whiteSpace: "pre",
                            fontSize: "20px",
                            fontFamily:
                                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: 400,
                            fontStyle: "normal",
                            letterSpacing: "normal",
                            textTransform: "none",
                        }}
                    >
                        {value}
                    </div>
                </div>
                <div
                    className="lbCqCB"
                    style={{
                        width: minWidth,
                        height: "2px",
                        backgroundColor: "rgb(227,231, 237)",
                        position: "absolute",
                        bottom: 0,
                    }}
                ></div>
            </div>
        );
    }
);
