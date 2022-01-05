import comp1 from "./components/comp1";
import Aos from "aos";

// import "../css/scss/main.scss";

let handleDomLoaded = function () {
    console.log("index");
    comp1();
    Aos.init({
        duration: 1200,
    });
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.scroll)
) {
    // Initialise JS components
    handleDomLoaded();
} else {
    // Initialise JS components
    document.addEventListener("DOMContentLoaded", handleDomLoaded);
}
