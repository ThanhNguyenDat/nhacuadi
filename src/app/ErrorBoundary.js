import React, { Component } from "react";
export const ErrorContext = React.createContext();

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, { componentStack }) {
        // You can also log the error to an error reporting service
        this.setState({
            error,
            hasError: true,
            errorInfo: componentStack,
        });
    }

    render() {
        if (this.state.hasError) {
            const { error, errorInfo } = this.state;
            if (process.env.NODE_ENV === "production") {
                history.go("/404");
            }
            const goBack = () => {
                // usually this will trigger React Router in the broken app, which is not helpful
                history.back();
                // so we reload app totally on that previous page after some delay for Router's stuff
                setTimeout(() => location.reload(), 32);
            };
            return (
                <div>
                    <button onClick={goBack}>Go back</button>
                </div>
            );
        }
        return (
            <ErrorContext.Provider
                value={{
                    hasError: this.state.hasError,
                    error: this.state.error,
                    errorInfo: this.state.errorInfo,
                    silence: this.silence,
                    unsilence: this.unsilence,
                }}
            >
                {this.props.children}
            </ErrorContext.Provider>
        );
    }
}

export const ErrorUI = () => {
    const context = React.useContext(ErrorContext);

    return context.hasError && <div className="error">Error occurred</div>;
};
