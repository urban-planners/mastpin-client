import { useEffect } from "react"

const useExternalScripts = ({ options={}, onHead=true }) => {
    useEffect(() => {
        const head = document.querySelector("head");
        const body = document.querySelector("body");
        const script = document.createElement("script");

        Object.entries(options).forEach(option => {
            script.setAttribute(option[0], option[1]);
        })
        onHead ? head.appendChild(script)
            : body.appendChild(script);

        return () => {
            onHead ? head.removeChild(script)
                : body.removeChild(script);
        }
    }, []);
}

export default useExternalScripts