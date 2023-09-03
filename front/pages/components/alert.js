const Alert = ({color,text}) => {
    const colors = {
        red : 'bg-rose-600',
        green : 'bg-teal-600',
        yellow : 'bg-yellow-400',
    }
    const alert = document.createElement('div')
    alert.className = `${colors[color]} py-5 px-8 rounded-xl m-2 cursor-pointer`
    alert.onclick =  function () {
        this.parentElement.removeChild(this);
    };
    const write = document.createElement('p')
    write.innerText = text
    write.className = 'text-white text-sm'
    alert.appendChild(write)
    document.getElementById('select_alert').appendChild(alert)
    setTimeout(() => {try {document.getElementById('select_alert').removeChild(alert)}catch{}}, 3000);
}
export {Alert}