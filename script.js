document.addEventListener("DOMContentLoaded", function () {
    const roomPrices = {
        individual: 100.00,
        doble: 180.00,
        triple: 225.00
    };

    const roomNumbers = {
        individual: [24, 28, 31, 32, 33, 35, 36, 37, 38, 39, 40, 42, 45, 46, 48],
        doble: [23, 30, 34, 41, 43, 44, 47],
        triple: [29, 49]
    };

    const roomTypeSelect = document.getElementById("roomType");
    const roomNumberSelect = document.getElementById("roomNumber");
    const nightsInput = document.getElementById("nights");
    const totalDisplay = document.getElementById("total");

    // Llenar el select de números de habitaciones según el tipo
    roomTypeSelect.addEventListener("change", function () {
        const selectedType = roomTypeSelect.value;
        roomNumberSelect.innerHTML = ""; // Limpiar opciones

        roomNumbers[selectedType].forEach(function (number) {
            const option = document.createElement("option");
            option.value = number;
            option.textContent = number;
            roomNumberSelect.appendChild(option);
        });

        updateTotal(); // Actualizar total al cambiar habitación
    });

    // Actualizar el total al cambiar noches
    nightsInput.addEventListener("input", updateTotal);

    function updateTotal() {
        const selectedType = roomTypeSelect.value;
        const price = roomPrices[selectedType];
        const nights = parseInt(nightsInput.value) || 1; // Valor por defecto 1
        const total = price * nights;
        totalDisplay.textContent = total.toFixed(2);
    }

    // Generar PDF
    document.getElementById("reservationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Cargar el logo
        const logo = new Image();
        logo.src = 'logo.png'; // Asegúrate de que la ruta sea correcta

        logo.onload = function () {
            doc.addImage(logo, 'PNG', 10, 10, 40, 20); // Tamaño y posición del logo
            doc.setFontSize(20);
            doc.text("Reserva del Hotel Yohana", 105, 40, { align: "center" });

            // Detalles de la reserva
            doc.setFontSize(12);
            doc.text(`Nombre: ${document.getElementById("name").value}`, 105, 60, { align: "center" });
            doc.text(`Tipo de habitación: ${roomTypeSelect.options[roomTypeSelect.selectedIndex].text}`, 105, 70, { align: "center" });
            doc.text(`Número de habitación: ${roomNumberSelect.value}`, 105, 80, { align: "center" });
            doc.text(`Número de noches: ${nightsInput.value}`, 105, 90, { align: "center" });
            doc.text(`Total: Q${totalDisplay.textContent}`, 105, 100, { align: "center" });
            doc.text(`Fecha: ${document.getElementById("date").value}`, 105, 110, { align: "center" });

            // Descargar PDF
            doc.save("reserva_hotel_yohana.pdf");
        };
    });

    // Inicializar el select de números de habitaciones
    roomTypeSelect.dispatchEvent(new Event('change'));
});
