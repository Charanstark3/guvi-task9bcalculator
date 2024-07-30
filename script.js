document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.buttons');

    const createButton = (text, className = '') => {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = `btn btn-light ${className}`;
        return button;
    };

    const buttons = [
        { text: 'C', className: 'clear' },
        { text: '←' },
        { text: '.' },
        { text: '×', className: 'operator' },
        { text: '7' },
        { text: '8' },
        { text: '9' },
        { text: '÷', className: 'operator' },
        { text: '4' },
        { text: '5' },
        { text: '6' },
        { text: '-', className: 'operator' },
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '+', className: 'operator' },
        { text: '0' },
        { text: '00' },
        { text: '=', className: 'operator' },
    ];

    buttons.forEach(button => {
        buttonsContainer.appendChild(createButton(button.text, button.className));
    });

    buttonsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName !== 'BUTTON') return;

        const value = target.textContent;

        if (value === 'C') {
            display.value = '0';
        } else if (value === '←') {
            display.value = display.value.slice(0, -1) || '0';
        } else if (value === '=') {
            try {
                display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
            } catch {
                display.value = 'Error';
            }
        } else {
            if (display.value === '0') {
                display.value = value;
            } else {
                display.value += value;
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        const operators = ['+', '-', '*', '/', 'Enter', 'Backspace', '.'];

        if (!isNaN(key) || operators.includes(key)) {
            if (key === 'Enter') {
                try {
                    display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
                } catch {
                    display.value = 'Error';
                }
            } else if (key === 'Backspace') {
                display.value = display.value.slice(0, -1) || '0';
            } else {
                if (display.value === '0') {
                    display.value = key;
                } else {
                    display.value += key;
                }
            }
        } else {
            alert('Only numbers are allowed');
            event.preventDefault();
        }
    });
});