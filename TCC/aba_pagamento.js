const paymentOptions = document.querySelectorAll('input[name="payment"]');
const formContainer = document.getElementById('payment-form-container');
const paymentButton = document.getElementById('payment-action');

let selectedPayment = 'cartao';
let stage = 0; // 0 = continuar, 1 = confirmar

paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
        selectedPayment = option.value;
        stage = 0;
        paymentButton.textContent = 'Continuar';
        formContainer.innerHTML = '';
    });
});

paymentButton.addEventListener('click', () => {
    if (selectedPayment === 'cartao' || selectedPayment === 'debito') {
        if(stage === 0){
            // Mostrar formulário do cartão
            formContainer.innerHTML = `
                <div class="card-info">
                    <input type="text" placeholder="Nome no cartão" />
                    <input type="text" placeholder="Número do cartão" />
                    <input type="text" placeholder="Validade (MM/AA)" />
                    <input type="text" placeholder="CVC" />
                    <input type="text" placeholder="CPF" />
                </div>
            `;
            paymentButton.textContent = 'Confirmar Pagamento';
            stage = 1;
        } else {
            confirmPayment();
        }
    } else if (selectedPayment === 'pix') {
        if(stage === 0){
            formContainer.innerHTML = `
                <div class="pix-info">
                    <p>Escaneie o QR Code abaixo para pagar:</p>
                    <canvas id="qrcode"></canvas>
                </div>
            `;
            generatePixQRCode();
            paymentButton.textContent = 'Confirmar Pagamento';
            stage = 1;
        } else {
            confirmPayment();
        }
    } else {
        confirmPayment();
    }
});

function confirmPayment(){
    alert(`Pagamento realizado com sucesso via ${selectedPayment === 'cartao' ? 'Cartão de Crédito' : selectedPayment === 'debito' ? 'Cartão de Débito' : selectedPayment === 'pix' ? 'PIX' : 'Boleto'}!`);
    window.location.href = "./obrigado.html";
}

function generatePixQRCode(){
    const canvas = document.getElementById('qrcode');
    const pixText = "00020126580014BR.GOV.BCB.PIX0136524933328145204000053039865406399.905802BR5920Vinícius Modesto Moreto6009Piracicaba62070503***6304ABCD";
    QRCode.toCanvas(canvas, pixText, { width: 200 }, function (error) {
        if (error) console.error(error);
    });
}
