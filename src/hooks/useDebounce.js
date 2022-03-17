export default function (cb, ms) {
    let timeout;

    return function () {
        const cbCall = () => {cb.apply(this, arguments)};

        clearTimeout(timeout);

        timeout = setTimeout(cbCall, ms);
    }
}
