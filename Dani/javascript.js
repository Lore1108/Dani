
        let mes = new Date().getMonth();
        let anio = 2025;
        
        const servicios = {
            manicura: [
                "Manos semipermanentes", "Uñas artificiales: Acrílico", "PolyGel", "Press On",
                "Recubrimiento con rubber", "Recubrimiento acrílico", "Recubrimiento poly gel",
                "Pies en tradicional", "Pies en semipermanentes", "Manos en tradicional"
            ],
            cabello: [
                "Corte básico de dama", "Corte texturizado", "Aminoácidos", "Peinado para toda ocasión", "Tintes de un solo color", "Recubrimiento de canas"
            ],
            depilacion: [
                "Depilación en cera piernas", "Depilación en cera axilas", "Depilación en cera cejas", "Cejas semipermanentes"
            ]
        };
        
        function actualizarServicios() {
            const categoria = document.getElementById("categoria").value;
            const servicioSelect = document.getElementById("servicio");
            servicioSelect.innerHTML = '<option value="">Selecciona un servicio</option>';
            
            if (categoria && servicios[categoria]) {
                servicios[categoria].forEach(servicio => {
                    let option = document.createElement("option");
                    option.value = servicio;
                    option.textContent = servicio;
                    servicioSelect.appendChild(option);
                });
            }
        }

        function actualizarCalendario() {
            const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            document.getElementById("mes-actual").textContent = `${meses[mes]} ${anio}`;
            
            const calendario = document.getElementById("calendario");
            calendario.innerHTML = "";
            
            const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
            diasSemana.forEach(dia => {
                let diaSemana = document.createElement("div");
                diaSemana.textContent = dia;
                diaSemana.classList.add("dia-semana");
                calendario.appendChild(diaSemana);
            });
            
            const primerDia = new Date(anio, mes, 1).getDay();
            const diasDelMes = new Date(anio, mes + 1, 0).getDate();
            
            for (let i = 0; i < (primerDia === 0 ? 6 : primerDia - 1); i++) {
                let espacioVacio = document.createElement("div");
                calendario.appendChild(espacioVacio);
            }
            
            for (let i = 1; i <= diasDelMes; i++) {
                let dia = document.createElement("div");
                let fecha = new Date(anio, mes, i);
                dia.classList.add("dia");
                dia.textContent = i;
                
                if (fecha.getDay() === 0) {
                    dia.classList.add("sin-servicio");
                } else {
                    dia.classList.add("disponible");
                    dia.onclick = () => seleccionarDia(dia);
                }
                
                calendario.appendChild(dia);
            }
        }
        function cambiarMes(direccion) {
            mes += direccion;
            if (mes < 0) {
                mes = 11;
                anio--;
            } else if (mes > 11) {
                mes = 0;
                anio++;
            }
            actualizarCalendario();
        }
        function seleccionarDia(dia) {
            if (!dia.classList.contains("ocupado") && !dia.classList.contains("sin-servicio")) {
                document.querySelectorAll(".dia").forEach(d => d.classList.remove("seleccionado"));
                dia.classList.add("seleccionado");
            }
        }
        actualizarCalendario();
