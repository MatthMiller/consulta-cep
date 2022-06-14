const inputField = document.querySelector('input[name="cep"]');
const requestButton = document.querySelector('[data-js=submit]')

const handleSubmit = (event) => {
    event.preventDefault();
    formatCEP(inputField.value);
}
requestButton.addEventListener('click', handleSubmit);

const formatCEP = (input) => {
    let inputFormatted = input.replace(/\D/g, '');
    requestData(inputFormatted);
}

const requestData = (cep) => {
    const requestedCEP = fetch(`https://viacep.com.br/ws/${cep}/json/`); 

    requestedCEP.then((r) => r.json()).then((cepObject) => {
        changeData(cepObject);
    });
}

const changeData = (cepObject) => {
    const displays = document.querySelectorAll('.resultado li span');
    displays.forEach((elementoAtual, index) => {
        if(cepObject.hasOwnProperty(displays[index].dataset.cep)) {
            let keyName = displays[index].dataset.cep;
            elementoAtual.innerHTML = cepObject[keyName];

            if(cepObject[keyName] == '') {
                elementoAtual.innerText = 'N/A';
            }
        }
    });
}