

// const root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", () => {
    
    const g = (string) => {
        return document.getElementById(string);
    }

    // acl stands for addClickListener
    const acl = (element, func) => {
        return element.addEventListener('click', func)
    }

    const hello = g('hello');
    const addButton = g("addbutton");
    const subtractButton = g('subtractbutton');
    const counter = g('counter');
    counter.innerHTML = 0;

    acl(addButton, () => { counter.innerHTML = parseInt(counter.innerHTML) + 1});
    acl(subtractButton, () => { counter.innerHTML = parseInt(counter.innerHTML) - 1});
    

})

console.log("Hello world!")