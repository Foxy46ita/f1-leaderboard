// Dati dei piloti
const drivers = [
    { position: 1, name: "Max Verstappen", team: "Red Bull Racing", gap: "Leader", tire: "S", logo: "redbull.png", fastestLap: true },
    { position: 2, name: "Liam Lawson", team: "Red Bull Racing", gap: "+1.2s", tire: "M", logo: "redbull.png", fastestLap: false },
    { position: 3, name: "Lewis Hamilton", team: "Scuderia Ferrari", gap: "+2.5s", tire: "M", logo: "ferrari.png", fastestLap: false },
    { position: 4, name: "Charles Leclerc", team: "Scuderia Ferrari", gap: "+3.0s", tire: "S", logo: "ferrari.png", fastestLap: false },
    { position: 5, name: "George Russell", team: "Mercedes-AMG Petronas", gap: "+4.1s", tire: "M", logo: "mercedes.png", fastestLap: false },
    { position: 6, name: "Andrea Kimi Antonelli", team: "Mercedes-AMG Petronas", gap: "+5.3s", tire: "H", logo: "mercedes.png", fastestLap: false },
    { position: 7, name: "Lando Norris", team: "McLaren F1 Team", gap: "+6.8s", tire: "H", logo: "mclaren.png", fastestLap: false },
    { position: 8, name: "Oscar Piastri", team: "McLaren F1 Team", gap: "+8.2s", tire: "M", logo: "mclaren.png", fastestLap: false },
    { position: 9, name: "Fernando Alonso", team: "Aston Martin Aramco Cognizant", gap: "+9.5s", tire: "S", logo: "astonmartin.png", fastestLap: false },
    { position: 10, name: "Lance Stroll", team: "Aston Martin Aramco Cognizant", gap: "+11.0s", tire: "S", logo: "astonmartin.png", fastestLap: false },
    { position: 11, name: "Pierre Gasly", team: "Alpine F1 Team", gap: "+12.5s", tire: "M", logo: "alpine.png", fastestLap: false },
    { position: 12, name: "Jack Doohan", team: "Alpine F1 Team", gap: "+14.0s", tire: "H", logo: "alpine.png", fastestLap: false },
    { position: 13, name: "Carlos Sainz", team: "Williams Racing", gap: "+15.5s", tire: "S", logo: "williams.png", fastestLap: false },
    { position: 14, name: "Alexander Albon", team: "Williams Racing", gap: "+17.0s", tire: "M", logo: "williams.png", fastestLap: false },
    { position: 15, name: "Nico Hülkenberg", team: "Sauber (futura Audi)", gap: "+18.5s", tire: "H", logo: "sauber.png", fastestLap: false },
    { position: 16, name: "Gabriel Bortoleto", team: "Sauber (futura Audi)", gap: "+20.0s", tire: "H", logo: "sauber.png", fastestLap: false },
    { position: 17, name: "Esteban Ocon", team: "Haas F1 Team", gap: "+21.5s", tire: "M", logo: "haas.png", fastestLap: false },
    { position: 18, name: "Oliver Bearman", team: "Haas F1 Team", gap: "+23.0s", tire: "H", logo: "haas.png", fastestLap: false },
    { position: 19, name: "Yuki Tsunoda", team: "Racing Bulls", gap: "+24.5s", tire: "S", logo: "racingbulls.png", fastestLap: false },
    { position: 20, name: "Isack Hadjar", team: "Racing Bulls", gap: "+26.0s", tire: "S", logo: "racingbulls.png", fastestLap: false }
];

// Funzione per ottenere la classe delle gomme
function getTireClass(tire) {
    switch(tire) {
        case 'S': return 'tire-soft';
        case 'M': return 'tire-medium';
        case 'H': return 'tire-hard';
        default: return '';
    }
}

// Funzione per rendere la leaderboard
function renderLeaderboard() {
    const tableBody = document.getElementById("leaderboard");
    tableBody.innerHTML = ""; // Pulisce il contenuto precedente
    
    drivers.forEach(driver => {
        const row = document.createElement("tr");
        
        // Evidenzia il primo pilota e il pilota con il giro veloce
        if (driver.position === 1) {
            row.classList.add('highlight');
        }
        if (driver.fastestLap) {
            row.classList.add('fastest-lap');
        }
        
        // Imposta il contenuto della riga
        row.innerHTML = `
            <td class="position">${driver.position}</td>
            <td><img src="logos/${driver.logo}" alt="${driver.team}" class="team-logo"></td>
            <td>
                <span class="driver-name">${driver.name}</span>
                <span class="team-name">${driver.team}</span>
            </td>
            <td class="gap ${driver.position === 1 ? 'leader' : ''}">${driver.gap}</td>
            <td class="tire">
                <span class="tire-indicator ${getTireClass(driver.tire)}" title="${
                    driver.tire === 'S' ? 'Soft' : 
                    driver.tire === 'M' ? 'Medium' : 
                    'Hard'
                }"></span>
            </td>
        `;
        
        tableBody.appendChild(row);
        
        // Aggiungi un evento di click per mostrare le informazioni del pilota
        row.addEventListener('click', () => showDriverInfo(driver));
        
        // Aggiungi una piccola animazione di entrata a ogni riga
        setTimeout(() => {
            row.style.opacity = "0";
            row.style.transform = "translateY(-10px)";
            row.style.transition = "all 0.3s ease";
            
            setTimeout(() => {
                row.style.opacity = "1";
                row.style.transform = "translateY(0)";
            }, driver.position * 50);
        }, 0);
    });
}

// Funzione per mostrare le informazioni del pilota
function showDriverInfo(driver) {
    const infoContainer = document.getElementById("driver-popup");
    const logo = document.getElementById("popup-driver-logo");
    const position = document.getElementById("popup-driver-position");
    
    logo.src = `logos/${driver.logo}`; // Imposta il logo del pilota
    logo.alt = `${driver.team} Logo`; // Imposta l'alt del logo
    position.textContent = driver.position; // Imposta la posizione

    // Imposta il nome e la scuderia
    const teamName = document.getElementById("popup-driver-team");
    teamName.textContent = driver.team;

    // Imposta il nome completo del pilota
    const driverFullName = document.getElementById("popup-driver-fullname");
    driverFullName.textContent = driver.name; // Nome e cognome del pilota

    // Imposta il colore della linea sopra in base alla scuderia
    const teamColors = {
        "Red Bull Racing": "#1E41FF",
        "Scuderia Ferrari": "#FF2800",
        "McLaren F1 Team": "#FF8700",
        "Mercedes-AMG Petronas": "#00D2D3",
        "Aston Martin Aramco": "#007A33",
        "Alpine F1 Team": "#0090FF",
        "Alfa Romeo Racing": "#A50000",
        "AlphaTauri": "#A3C1E0",
        "Haas F1 Team": "#FFFFFF",
        "Williams Racing": "#005EB8"
    };

    const borderColor = teamColors[driver.team] || "#FFFFFF"; // Colore di default
    infoContainer.querySelector('.info-content').style.borderTopColor = borderColor;

    infoContainer.classList.add('show');
    
    // Rimuovi l'animazione dopo un certo tempo
    setTimeout(() => {
        infoContainer.classList.remove('show');
    }, 3000); // Mostra per 3 secondi
}

// Funzione per gestire il click del pulsante "bandiera rossa"
document.getElementById("red-flag-button").addEventListener("click", () => {
    const redFlagBox = document.getElementById("red-flag-box");
    redFlagBox.classList.toggle("hidden");
});

// Simulazione di aggiornamenti in tempo reale
function simulateUpdates() {
    setInterval(() => {
        // Sceglie un pilota random per aggiornare il distacco
        const randomIndex = Math.floor(Math.random() * drivers.length);
        const driver = drivers[randomIndex];
        
        if (driver.position > 1) {
            // Aggiorna il distacco leggermente
            const currentGap = parseFloat(driver.gap.replace('+', '').replace('s', ''));
            const change = (Math.random() * 0.4 - 0.2).toFixed(1); // -0.2 a +0.2
            const newGap = (currentGap + parseFloat(change)).toFixed(1);
            driver.gap = `+${newGap}s`;
            
            // Aggiorna il DOM senza animazioni
            const rows = document.querySelectorAll('#leaderboard tr');
            const targetRow = rows[randomIndex];
            const gapCell = targetRow.querySelector('.gap');
            gapCell.textContent = driver.gap;
        }
    }, 3000);
}

// Funzione per inizializzare il rendering e le simulazioni
document.addEventListener("DOMContentLoaded", () => {
    renderLeaderboard();
    setTimeout(simulateUpdates, 2000); // Inizia gli aggiornamenti dopo 2 secondi
    // Non è presente la funzione updateLapInfo, quindi è stata rimossa
    // setTimeout(updateLapInfo, 5000); // Aggiorna info giri ogni 10 secondi
    
    // Crea l'effetto delle linee animate
    createAnimatedLines();
});

// Funzione per creare linee animate aggiuntive dinamicamente
function createAnimatedLines() {
    const linesContainer = document.querySelector('.animated-lines');
    
    setInterval(() => {
        const line = document.createElement('div');
        line.className = 'animated-line';
        
        // Posizione e dimensione casuale
        line.style.top = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 50 + 50}%`;
        line.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        line.style.height = `${Math.random() * 1 + 1}px`;
        
        linesContainer.appendChild(line);
        
        // Rimuovi la linea dopo l'animazione
        setTimeout(() => {
            if (line.parentNode) {
                line.parentNode.removeChild(line);
            }
        }, 3000);
    }, 2000);
}