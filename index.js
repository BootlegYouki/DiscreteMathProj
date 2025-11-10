const ALLOWED_SET = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
const BLOCKED_SET = new Set([0, 9]);

function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function checkRule1(digits) {
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    return { valid: isPrime(sum), sum };
}

function checkRule2(digits) {
    const product = digits[0] * digits[3];
    return product % 7 === 3;
}

function checkRule3(digits) {
    const uniqueDigits = new Set(digits);
    return uniqueDigits.size === digits.length;
}

function checkRule4(digits, sum) {
    const condition1 = digits[0] > digits[1] && digits[2] % 2 === 0;
    const condition2 = isPrime(sum) && digits[3] < 5;
    return condition1 || condition2;
}

function checkRule5(digits) {
    return digits.every(digit => ALLOWED_SET.has(digit) && !BLOCKED_SET.has(digit));
}

function validateCode(code) {
    const digits = code.split('').map(Number);
    
    const rule1Result = checkRule1(digits);
    const rule1 = rule1Result.valid;
    const rule2 = checkRule2(digits);
    const rule3 = checkRule3(digits);
    const rule4 = checkRule4(digits, rule1Result.sum);
    const rule5 = checkRule5(digits);
    
    return {
        rules: { rule1, rule2, rule3, rule4, rule5 },
        allValid: rule1 && rule2 && rule3 && rule4 && rule5
    };
}

function updateUI(results) {
    const rules = ['rule1', 'rule2', 'rule3', 'rule4', 'rule5'];
    let validCount = 0;
    
    rules.forEach(rule => {
        const element = document.getElementById(rule);
        const statusIcon = element.querySelector('.rule-status');
        element.classList.remove('valid', 'invalid');
        
        if (results.rules[rule]) {
            element.classList.add('valid');
            statusIcon.textContent = 'check_circle';
            validCount++;
        } else {
            element.classList.add('invalid');
            statusIcon.textContent = 'cancel';
        }
    });
    
    const percentage = (validCount / 5) * 100;
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    progressBarFill.style.width = percentage + '%';
    progressPercentage.textContent = percentage + '%';
    
    const resultMessage = document.getElementById('result-message');
    resultMessage.classList.remove('success', 'failure');
    
    if (results.allValid) {
        resultMessage.textContent = 'VAULT UNLOCKED';
        resultMessage.classList.add('success');
    } else {
        resultMessage.textContent = 'ACCESS DENIED';
        resultMessage.classList.add('failure');
    }
}

function resetUI() {
    const rules = ['rule1', 'rule2', 'rule3', 'rule4', 'rule5'];
    rules.forEach(rule => {
        const element = document.getElementById(rule);
        const statusIcon = element.querySelector('.rule-status');
        element.classList.remove('valid', 'invalid');
        statusIcon.textContent = 'radio_button_unchecked';
    });
    
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    progressBarFill.style.width = '0%';
    progressPercentage.textContent = '0%';
    
    const resultMessage = document.getElementById('result-message');
    resultMessage.textContent = '';
    resultMessage.classList.remove('success', 'failure');
}

const otpInputs = document.querySelectorAll('.otp-input');

otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        if (!/^\d$/.test(value)) {
            e.target.value = '';
            return;
        }
        
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
        
        const code = Array.from(otpInputs).map(input => input.value).join('');
        if (code.length === 4 && /^\d{4}$/.test(code)) {
            const results = validateCode(code);
            updateUI(results);
        } else {
            resetUI();
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (!e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
            setTimeout(() => {
                const code = Array.from(otpInputs).map(input => input.value).join('');
                if (code.length === 4 && /^\d{4}$/.test(code)) {
                    const results = validateCode(code);
                    updateUI(results);
                } else {
                    resetUI();
                }
            }, 10);
        }
    });
    
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        
        if (/^\d{4}$/.test(pastedData)) {
            pastedData.split('').forEach((char, i) => {
                if (otpInputs[i]) {
                    otpInputs[i].value = char;
                }
            });
            otpInputs[3].focus();
            
            const results = validateCode(pastedData);
            updateUI(results);
        }
    });
});