document.addEventListener("DOMContentLoaded", () => {
    const btnEspera = document.getElementById("btn-espera");
    const areaSenha = document.getElementById("area-senha");
    const inputSenha = document.getElementById("input-senha");
    const btnValidar = document.getElementById("btn-validar");
    const erroSenha = document.getElementById("erro-senha");
    const caixaDica = document.getElementById("caixa-dica");
    const statusText = document.getElementById("status-text");
    const temporizadorElement = document.getElementById("temporizador");

    // ===== CONFIGURE A RESPOSTA CORRETA AQUI =====
    // Coloque a resposta esperada para a sua pergunta
    const SENHA_CORRETA = "TEMAKI"; 
    // =============================================

    // Define o horário alvo (Ex: HOJE às 22:30:00)
    const alvo = new Date();
    alvo.setHours(22, 30, 0, 0);

    const atualizarRelogio = setInterval(() => {
        const agora = new Date().getTime();
        const diferenca = alvo.getTime() - agora;

        if (diferenca <= 0) {
            clearInterval(atualizarRelogio);
            temporizadorElement.innerText = "00:00:00";
            temporizadorElement.style.color = "#39ff14"; 
            temporizadorElement.style.textShadow = "0 0 15px rgba(57, 255, 20, 0.5)";
            
            btnEspera.style.display = "none";
            areaSenha.classList.remove("oculto");
            statusText.innerText = "> BLOQUEIO TEMPORAL REMOVIDO. AGUARDANDO RESPOSTA DE SEGURANÇA...";
        } else {
            const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

            const hFormatado = String(horas).padStart(2, '0');
            const mFormatado = String(minutos).padStart(2, '0');
            const sFormatado = String(segundos).padStart(2, '0');

            temporizadorElement.innerText = `${hFormatado}:${mFormatado}:${sFormatado}`;
        }
    }, 1000);

    btnValidar.addEventListener("click", () => {
        const tentativa = inputSenha.value.trim();

        // O .toUpperCase() garante que não importa se ela digitar maiúsculo ou minúsculo
        if (tentativa.toUpperCase() === SENHA_CORRETA.toUpperCase()) {
            areaSenha.style.display = "none";
            temporizadorElement.style.display = "none";
            caixaDica.classList.remove("oculto");
            
            statusText.innerText = "> IDENTIDADE CONFIRMADA. DESCRIPTOGRAFIA CONCLUÍDA.";
            statusText.style.color = "#39ff14";
        } else {
            erroSenha.classList.remove("oculto");
            inputSenha.value = ""; 
            inputSenha.focus();
        }
    });
});
