const comp1 = () => {
    document.querySelectorAll(".item").forEach((elem: HTMLElement) => {
        elem.style.color = "red";
    });

    console.log("comp1 - color boxe-text red test: success");
};

export default comp1;
