window.onload = () => {
    const { jsPDF } = window.jspdf;

    // Configurações das máscaras
    $("#telefone").inputmask("(99) 99999-9999");

    (function () {
        'use strict';
        const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    gerarPDF();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();

    function gerarPDF() {
        const pdf = new jsPDF();
        pdf.setFontSize(12); // Tamanho da fonte
        pdf.setLineHeightFactor(1.2); // Espaçamento entre linhas
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const estadoCivil = document.getElementById("estado_civil").value;
        const naturalidade = document.getElementById("naturalidade").value;
        const nacionalidade = document.getElementById("nacionalidade").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
        const objetivo = document.getElementById("objetivo").value;
        const escolaridade = document.getElementById("escolaridade").value;
        const cursos = document.getElementById("cursos").value;
        const experiencia = document.getElementById("experiencia").value;
        const referencias = document.getElementById("referencias").value;

        let y = 20; // Posição vertical inicial

        // Nome em negrito
        pdf.setFont("Helvetica", "bold");
        pdf.text(nome.toUpperCase(), 20, y);
        y += 5; // Espaçamento após o nome
        pdf.setFont("Helvetica", "normal"); // Retorna ao estilo normal

        // Campos pessoais com espaçamento reduzido
        const personalInfo = [
            `Idade: ${idade}`,
            `Estado Civil: ${estadoCivil}`,
            `Naturalidade: ${naturalidade}`,
            `Nacionalidade: ${nacionalidade}`,
            `Telefone: ${telefone}`,
            `Email: ${email}`
        ];

        personalInfo.forEach(info => {
            pdf.text(info, 20, y);
            y += 5; // Espaçamento reduzido entre campos
        });

        // Adicionando as seções com espaçamento adequado
        const sections = [
            { title: "Objetivo:", content: objetivo },
            { title: "Escolaridade:", content: escolaridade },
            { title: "Cursos:", content: cursos },
            { title: "Experiência Profissional:", content: experiencia },
            { title: "Referências:", content: referencias }
        ];

        sections.forEach(section => {
            if (section.content) {
                // Espaçamento antes do título
                y += 5; // Espaço adicional antes do título
                // Títulos em negrito
                pdf.setFont("Helvetica", "bold");
                pdf.text(section.title, 20, y);
                y += 5; // Espaçamento após o título
                
                pdf.setFont("Helvetica", "normal"); // Retorna ao estilo normal
                const lines = pdf.splitTextToSize(section.content, 180);

                lines.forEach(line => {
                    if (y > 270) { // Se a posição y ultrapassar 270, adiciona uma nova página
                        pdf.addPage();
                        y = 20; // Reseta a posição vertical
                    }
                    pdf.text(line, 20, y);
                    y += 4; // Espaçamento reduzido entre linhas
                });
                y += 5; // Espaço extra após o conteúdo
            }
        });

        // Salva o PDF com o formato "nome - curriculo"
        pdf.save(`${nome} - curriculo.pdf`);
    }
};
