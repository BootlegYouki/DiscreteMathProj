# Discrete Mathematics Major Project
## "Digital Security Puzzle: 4-Digit Vault System"

**Group 5**  
**Course:** Discrete Mathematics  
**Date:** November 27, 2025

---

## 1. PROJECT OVERVIEW

### 1.1 Introduction

The Digital Security Puzzle is an interactive web-based application that simulates a secure vault locking mechanism using fundamental concepts from discrete mathematics. The system requires users to find a valid 4-digit code that simultaneously satisfies five mathematical validation rules derived from number theory, set theory, and propositional logic.

This project demonstrates the practical application of discrete mathematics in cybersecurity, where mathematical principles ensure data integrity and access control. The puzzle serves as an educational tool to illustrate how abstract mathematical concepts translate into real-world security systems.

**Live Demo:** https://discrete-math-proj.vercel.app/

### 1.2 Project Scenario

We have chosen to create a **logic-based access code system** that combines multiple discrete mathematics topics. The system validates user input against a set of mathematical constraints, simulating how real-world authentication systems verify credentials using computational logic.

### 1.3 Objectives

- Implement a digital security system using discrete mathematics principles
- Demonstrate the application of number theory, set theory, and logic in security validation
- Create an intuitive user interface with real-time feedback
- Document the mathematical reasoning behind the validation system

---

## 2. DISCRETE MATHEMATICS CONCEPTS USED

This project incorporates **four major topics** from discrete mathematics:

### 2.1 Number Theory
- **Prime Numbers**: Used to validate the sum of digits
- **Modular Arithmetic**: Applied to create non-obvious relationships between digits

### 2.2 Set Theory
- **Set Membership**: Restricting digits to specific allowed sets
- **Set Cardinality**: Ensuring uniqueness of elements

### 2.3 Propositional Logic
- **Logical Operators**: AND, OR operators for compound conditions
- **Boolean Expressions**: Complex truth evaluations

### 2.4 Counting Principles
- **Combinatorics**: Calculating total possible valid codes
- **Product Rule**: Determining the solution space

---

## 3. SYSTEM DESIGN AND VALIDATION RULES

### 3.1 Rule 1: Prime Number Sum (Number Theory)

**Mathematical Concept:** Prime Number Theorem

**Rule:** The sum of all four digits must be a prime number.

**Formula:**
```
Let code = d₁d₂d₃d₄ where dᵢ represents the i-th digit

Sum S = d₁ + d₂ + d₃ + d₄

Rule 1 is satisfied if S ∈ {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31}
```

**Implementation Logic:**
```javascript
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
```

**Explanation:**  
A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. This rule ensures that the sum of digits falls into a mathematically significant category, reducing the number of valid combinations. For a 4-digit code using digits 1-8, the minimum sum is 4 (1+1+1+1) and maximum is 32 (8+8+8+8), creating a constraint on digit selection.

---

### 3.2 Rule 2: Modular Arithmetic (Number Theory)

**Mathematical Concept:** Modular Arithmetic and Congruence Relations

**Rule:** The product of the first and last digits modulo 7 must equal 3.

**Formula:**
```
(d₁ × d₄) ≡ 3 (mod 7)

Or equivalently: (d₁ × d₄) mod 7 = 3
```

**Implementation Logic:**
```javascript
function checkRule2(digits) {
    const product = digits[0] * digits[3];
    return product % 7 === 3;
}
```

**Explanation:**  
Modular arithmetic deals with remainders after division. The congruence relation a ≡ b (mod m) means that a and b leave the same remainder when divided by m. This rule creates a non-linear relationship between the first and last digits, significantly constraining valid combinations.

**Valid Pairs (d₁, d₄) where (d₁ × d₄) mod 7 = 3:**

| d₁ | d₄ | Product | Product mod 7 |
|----|----|---------|--------------:|
| 1  | 3  | 3       | 3             |
| 2  | 5  | 10      | 3             |
| 3  | 1  | 3       | 3             |
| 3  | 8  | 24      | 3             |
| 4  | 2  | 8       | 1             |
| 5  | 2  | 10      | 3             |
| 5  | 6  | 30      | 2             |
| 6  | 4  | 24      | 3             |
| 7  | 5  | 35      | 0             |
| 8  | 3  | 24      | 3             |

---

### 3.3 Rule 3: Set Uniqueness (Set Theory)

**Mathematical Concept:** Set Cardinality and Injective Functions

**Rule:** All four digits must be unique (no repetitions).

**Formula:**
```
Let D = {d₁, d₂, d₃, d₄} be the set of digits

Rule 3 is satisfied if |D| = 4

Where |D| denotes the cardinality (number of elements) of set D
```

**Implementation Logic:**
```javascript
function checkRule3(digits) {
    const uniqueDigits = new Set(digits);
    return uniqueDigits.size === digits.length;
}
```

**Explanation:**  
This rule applies set theory to ensure injectivity—each position in the code maps to a distinct digit value. By requiring |D| = 4, we eliminate codes with repeated digits, reducing the solution space from 8⁴ = 4,096 to P(8,4) = 8!/(8-4)! = 1,680 permutations.

---

### 3.4 Rule 4: Compound Logical Conditions (Propositional Logic)

**Mathematical Concept:** Propositional Logic with AND, OR Operators

**Rule:** Either (d₁ > d₂ AND d₃ is even) OR (Sum is prime AND d₄ < 5)

**Logical Formula:**
```
Let:
P: d₁ > d₂
Q: d₃ is even (d₃ ≡ 0 (mod 2))
R: Sum is prime
S: d₄ < 5

Rule 4 is satisfied if: (P ∧ Q) ∨ (R ∧ S)
```

**Truth Table:**

| P (d₁>d₂) | Q (d₃ even) | R (sum prime) | S (d₄<5) | P∧Q | R∧S | (P∧Q)∨(R∧S) |
|:---------:|:-----------:|:-------------:|:--------:|:---:|:---:|:-----------:|
| T         | T           | T             | T        | T   | T   | **T**       |
| T         | T           | T             | F        | T   | F   | **T**       |
| T         | T           | F             | T        | T   | F   | **T**       |
| T         | T           | F             | F        | T   | F   | **T**       |
| T         | F           | T             | T        | F   | T   | **T**       |
| T         | F           | F             | T        | F   | F   | F           |
| F         | T           | T             | T        | F   | T   | **T**       |
| F         | F           | T             | T        | F   | T   | **T**       |
| (Other combinations evaluate to False)    ||||||||

**Implementation Logic:**
```javascript
function checkRule4(digits, sum) {
    const condition1 = digits[0] > digits[1] && digits[2] % 2 === 0;
    const condition2 = isPrime(sum) && digits[3] < 5;
    return condition1 || condition2;
}
```

**Explanation:**  
This rule demonstrates compound propositions using logical operators. The disjunction (OR) of two conjunctions (AND) creates multiple pathways for validation. A code can satisfy the rule through either branch, making the constraint more flexible while still maintaining security through complexity.

---

### 3.5 Rule 5: Set Membership Constraint (Set Theory)

**Mathematical Concept:** Set Membership and Set Operations

**Rule:** All digits must belong to the allowed set {1, 2, 3, 4, 5, 6, 7, 8}

**Formula:**
```
Let A = {1, 2, 3, 4, 5, 6, 7, 8} (allowed set)
Let B = {0, 9} (blocked set)
Let U = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9} (universal set of digits)

Rule 5 is satisfied if:
∀i ∈ {1,2,3,4}: dᵢ ∈ A ∧ dᵢ ∉ B

Equivalently: A ∪ B = U \ {0, 9} where \ denotes set difference
```

**Visual Representation:**
```
Universal Set U:  {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
                   ↓
Allowed Set A:    {1, 2, 3, 4, 5, 6, 7, 8}  ✓
Blocked Set B:    {0, 9}                     ✗
```

**Implementation Logic:**
```javascript
const ALLOWED_SET = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
const BLOCKED_SET = new Set([0, 9]);

function checkRule5(digits) {
    return digits.every(digit => 
        ALLOWED_SET.has(digit) && !BLOCKED_SET.has(digit)
    );
}
```

**Explanation:**  
This rule applies set membership operations to define the valid domain of digits. By explicitly excluding 0 and 9, we constrain the solution space while avoiding trivial solutions that might arise from using all possible digits.

---

## 4. MATHEMATICAL ANALYSIS

### 4.1 Solution Space Calculation (Counting Principles)

**Without Constraints:**
Total possible 4-digit codes using any digits 0-9:
```
10 × 10 × 10 × 10 = 10⁴ = 10,000 codes
```

**With Rule 5 (Allowed Set):**
Using only digits {1, 2, 3, 4, 5, 6, 7, 8}:
```
8 × 8 × 8 × 8 = 8⁴ = 4,096 codes
```

**With Rules 3 & 5 (Unique + Allowed):**
Permutations of 4 distinct digits from 8:
```
P(8, 4) = 8!/(8-4)! = 8!/4! = 8 × 7 × 6 × 5 = 1,680 codes
```

**With All Five Rules:**
The actual number of valid solutions is significantly smaller, requiring computational verification. Through exhaustive search, we can determine the exact count of codes satisfying all constraints simultaneously.

### 4.2 Constraint Satisfaction Problem (CSP)

This puzzle is a Constraint Satisfaction Problem where:
- **Variables:** V = {d₁, d₂, d₃, d₄}
- **Domains:** D = {1, 2, 3, 4, 5, 6, 7, 8} for each variable
- **Constraints:** C = {Rule1, Rule2, Rule3, Rule4, Rule5}

The goal is to find an assignment of values to variables that satisfies all constraints.

---

## 5. SAMPLE INPUTS AND OUTPUTS

### 5.1 Example 1: Invalid Code - "1234"

**Input:** 1234

**Validation Process:**

| Rule | Check | Result | Explanation |
|------|-------|:------:|-------------|
| 1    | Sum = 1+2+3+4 = 10 (not prime) | ✗ | 10 = 2 × 5, composite |
| 2    | (1×4) mod 7 = 4 mod 7 = 4 ≠ 3 | ✗ | Fails modular condition |
| 3    | {1,2,3,4} has 4 unique elements | ✓ | All digits distinct |
| 4    | 1>2? No; Sum prime? No | ✗ | Both conditions false |
| 5    | All in {1,2,3,4,5,6,7,8} | ✓ | All within allowed set |

**Output:** ACCESS DENIED (2/5 rules satisfied)

---

### 5.2 Example 2: Invalid Code - "8765"

**Input:** 8765

**Validation Process:**

| Rule | Check | Result | Explanation |
|------|-------|:------:|-------------|
| 1    | Sum = 8+7+6+5 = 26 (not prime) | ✗ | 26 = 2 × 13, composite |
| 2    | (8×5) mod 7 = 40 mod 7 = 5 ≠ 3 | ✗ | Fails modular condition |
| 3    | {8,7,6,5} has 4 unique elements | ✓ | All digits distinct |
| 4    | 8>7? Yes; 6 even? Yes | ✓ | First condition (P∧Q) true |
| 5    | All in {1,2,3,4,5,6,7,8} | ✓ | All within allowed set |

**Output:** ACCESS DENIED (3/5 rules satisfied)

---

### 5.3 Example 3: Valid Code - "8324"

**Input:** 8324

**Validation Process:**

| Rule | Check | Result | Explanation |
|------|-------|:------:|-------------|
| 1    | Sum = 8+3+2+4 = 17 (prime) | ✓ | 17 is prime |
| 2    | (8×4) mod 7 = 32 mod 7 = 4 ≠ 3 | ✗ | Fails modular condition |
| 3    | {8,3,2,4} has 4 unique elements | ✓ | All digits distinct |
| 4    | Sum=17 prime? Yes; 4<5? Yes | ✓ | Second condition (R∧S) true |
| 5    | All in {1,2,3,4,5,6,7,8} | ✓ | All within allowed set |

**Output:** ACCESS DENIED (4/5 rules satisfied)

---

### 5.4 Example 4: Potential Valid Code

**Note:** Finding a valid code requires systematic search or constraint solving. A valid code must satisfy:
- Prime sum (Rule 1)
- (d₁ × d₄) mod 7 = 3 (Rule 2)
- Unique digits (Rule 3)
- Compound logic condition (Rule 4)
- Digits in {1,2,3,4,5,6,7,8} (Rule 5)

**Strategy for Finding Solutions:**

1. Start with valid (d₁, d₄) pairs from Rule 2:
   - (1,3), (2,5), (3,1), (3,8), (5,2), (6,4), (8,3)

2. For each pair, try combinations of d₂ and d₃ that:
   - Are different from d₁ and d₄
   - Produce a prime sum
   - Satisfy Rule 4

3. Verify all five rules for each candidate

---

## 6. SYSTEM IMPLEMENTATION

### 6.1 Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with Poppins font, Material Icons
- **Architecture:** Client-side validation with real-time feedback

### 6.2 Core Algorithm

```javascript
function validateCode(code) {
    const digits = code.split('').map(Number);
    
    // Rule 1: Prime Sum
    const rule1Result = checkRule1(digits);
    const rule1 = rule1Result.valid;
    
    // Rule 2: Modular Arithmetic
    const rule2 = checkRule2(digits);
    
    // Rule 3: Uniqueness
    const rule3 = checkRule3(digits);
    
    // Rule 4: Compound Logic
    const rule4 = checkRule4(digits, rule1Result.sum);
    
    // Rule 5: Set Membership
    const rule5 = checkRule5(digits);
    
    return {
        rules: { rule1, rule2, rule3, rule4, rule5 },
        allValid: rule1 && rule2 && rule3 && rule4 && rule5
    };
}
```

### 6.3 User Interface Features

1. **Real-time Validation:** Immediate feedback as digits are entered
2. **Progress Tracking:** Visual progress bar showing percentage of rules satisfied
3. **Rule Status Display:** Individual indicators for each validation rule
4. **Responsive Design:** Mobile-friendly interface with adaptive layouts
5. **Smart Input Handling:** Auto-focus, paste support, backspace navigation

### 6.4 User Experience Flow

```
User enters digit → Auto-focus next input → Check if 4 digits complete
                                              ↓
                                     YES → Validate against all rules
                                              ↓
                                          Update UI with results
                                              ↓
                                     All valid? → VAULT UNLOCKED / ACCESS DENIED
```

---

## 7. APPLICATION OF DISCRETE MATHEMATICS

### 7.1 Number Theory Applications

**Prime Numbers in Security:**
Prime numbers form the foundation of modern cryptography (RSA encryption). Our use of prime sum validation demonstrates how number theory properties create non-obvious constraints that are easy to verify but hard to reverse-engineer.

**Modular Arithmetic in Hashing:**
The modular arithmetic rule (Rule 2) mimics hash functions used in password systems, where mathematical operations create deterministic but complex relationships between inputs.

### 7.2 Set Theory Applications

**Domain Restriction:**
By defining allowed and blocked sets, we implement access control lists (ACLs) similar to those used in database systems and network security.

**Uniqueness Constraints:**
The uniqueness requirement (Rule 3) parallels database primary key constraints and ensures data integrity through set cardinality.

### 7.3 Logic Applications

**Multi-factor Authentication:**
Rule 4's compound logic represents multi-factor authentication where multiple conditions can satisfy security requirements through different pathways (biometric OR password AND token).

**Boolean Algebra in Circuit Design:**
The logical operators (AND, OR) used in Rule 4 mirror Boolean circuits in digital security hardware.

### 7.4 Counting Principles Applications

**Password Strength Analysis:**
Understanding the solution space through permutations and combinations allows assessment of password strength and brute-force resistance.

**Entropy Calculation:**
The reduced solution space (from 10,000 to ~1,680 to even fewer valid codes) demonstrates how constraints affect password entropy and security.

---

## 8. SECURITY IMPLICATIONS

### 8.1 Brute Force Resistance

**Attempt Analysis:**
With all constraints, the valid solution space is drastically reduced compared to unconstrained 4-digit codes. However, an attacker without knowledge of the rules would need to test:
- Best case: 1 attempt (lucky guess)
- Average case: ~500 attempts
- Worst case: 1,680 attempts (all unique 4-digit permutations from set {1-8})

### 8.2 Mathematical Obfuscation

The combination of multiple discrete mathematics concepts creates "security through mathematical complexity." Even if an attacker knows the rules, finding valid codes requires computational effort or constraint satisfaction solving.

### 8.3 Real-World Parallels

This puzzle demonstrates principles used in:
- **Password validation systems** (character set requirements, complexity rules)
- **CAPTCHA systems** (mathematical puzzle solving)
- **Two-factor authentication** (multiple independent conditions)
- **Blockchain proof-of-work** (hash constraints, modular arithmetic)

---

## 9. EDUCATIONAL VALUE

### 9.1 Learning Outcomes

Students interacting with this puzzle gain understanding of:

1. **Abstract to Concrete Mapping:** How theoretical discrete mathematics translates to practical applications
2. **Computational Thinking:** Problem-solving through systematic constraint analysis
3. **Algorithm Design:** Implementing efficient validation procedures
4. **Security Awareness:** Understanding mathematical foundations of digital security

### 9.2 Interdisciplinary Connections

The project bridges:
- **Mathematics:** Prime numbers, modular arithmetic, set theory, logic
- **Computer Science:** Algorithm design, data structures, UI/UX
- **Cybersecurity:** Authentication, validation, access control
- **Web Development:** HTML, CSS, JavaScript implementation

---

## 10. FUTURE ENHANCEMENTS

### 10.1 Potential Extensions

1. **Variable Difficulty Levels:** Adjust number of rules or complexity
2. **Hint System:** Provide mathematical guidance based on failed rules
3. **Solution Counter:** Display total number of valid codes
4. **Solution Finder:** Implement backtracking algorithm to find all valid codes
5. **Time Limits:** Add timer for increased challenge
6. **Statistics Dashboard:** Track user attempts and common mistakes

### 10.2 Advanced Discrete Math Topics

Could incorporate:
- **Graph Theory:** Transition graphs showing valid digit sequences
- **Recurrence Relations:** Dynamic programming for solution counting
- **Probability Theory:** Calculate likelihood of random guess success
- **Formal Languages:** Define valid codes using regular expressions

---

## 11. CONCLUSION

The Digital Security Puzzle successfully demonstrates the practical application of discrete mathematics in cybersecurity contexts. By integrating number theory, set theory, propositional logic, and counting principles, the project creates an engaging educational tool that bridges theoretical concepts with real-world applications.

The system effectively illustrates how mathematical constraints can create secure, verifiable validation systems while maintaining user accessibility through intuitive interface design. This project serves as both an educational resource for understanding discrete mathematics and a practical demonstration of security system design principles.

Through the development and analysis of this puzzle, we have gained deeper appreciation for the role of mathematical rigor in computing and security, reinforcing the importance of discrete mathematics as a foundational discipline in computer science.

---

## 12. REFERENCES

1. **Rosen, K. H.** (2019). *Discrete Mathematics and Its Applications* (8th ed.). McGraw-Hill Education.
   - Chapter 2: Number Theory and Cryptography
   - Chapter 4: Number Theory and Cryptography
   - Chapter 6: Counting

2. **Epp, S. S.** (2020). *Discrete Mathematics with Applications* (5th ed.). Cengage Learning.
   - Section 4.3: Elementary Number Theory and Methods of Proof
   - Section 9.1: Set Theory

3. **Johnsonbaugh, R.** (2017). *Discrete Mathematics* (8th ed.). Pearson.
   - Chapter 3: Algorithms
   - Chapter 5: Number Theory
   - Chapter 8: Propositional Logic

4. **Grimaldi, R. P.** (2003). *Discrete and Combinatorial Mathematics: An Applied Introduction* (5th ed.). Pearson.
   - Chapter 2: Fundamentals of Logic
   - Chapter 7: Functions

5. **Web Resources:**
   - MDN Web Docs. (2024). JavaScript Documentation. Retrieved from https://developer.mozilla.org/
   - Material Design Icons. Google Fonts. Retrieved from https://fonts.google.com/icons
   - Prime Number Theorem. Wolfram MathWorld. Retrieved from https://mathworld.wolfram.com/

6. **Security Concepts:**
   - Stallings, W. (2017). *Cryptography and Network Security: Principles and Practice* (7th ed.). Pearson.
   - Chapter 4: Finite Fields and Number Theory

---

## APPENDIX A: COMPLETE SOURCE CODE

### A.1 HTML Structure (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discrete Math Group 5 Project</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="container">
        <div class="vault-container">
            <div class="code-input-section">
                <h1 class="title">4-DIGIT PUZZLE</h1>
                <div class="otp-container">
                    <input type="text" class="otp-input" maxlength="1" data-index="0" autocomplete="off">
                    <input type="text" class="otp-input" maxlength="1" data-index="1" autocomplete="off">
                    <input type="text" class="otp-input" maxlength="1" data-index="2" autocomplete="off">
                    <input type="text" class="otp-input" maxlength="1" data-index="3" autocomplete="off">
                </div>
            </div>

            <div class="validation-progress">
                <div class="progress-label">VALIDATION PROGRESS</div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="progress-bar-fill"></div>
                </div>
                <div class="progress-percentage" id="progress-percentage">0%</div>
                
                <div class="rules-list">
                    <div class="rule-item" id="rule1">
                        <span class="material-icons rule-status">radio_button_unchecked</span>
                        <span class="rule-text">Sum of digits must be prime</span>
                    </div>
                    <div class="rule-item" id="rule2">
                        <span class="material-icons rule-status">radio_button_unchecked</span>
                        <span class="rule-text">(First × Last) mod 7 = 3</span>
                    </div>
                    <div class="rule-item" id="rule3">
                        <span class="material-icons rule-status">radio_button_unchecked</span>
                        <span class="rule-text">All digits must be unique</span>
                    </div>
                    <div class="rule-item" id="rule4">
                        <span class="material-icons rule-status">radio_button_unchecked</span>
                        <span class="rule-text">(D1 > D2 AND D3 is even) OR (Sum prime AND D4 < 5)</span>
                    </div>
                    <div class="rule-item" id="rule5">
                        <span class="material-icons rule-status">radio_button_unchecked</span>
                        <span class="rule-text">Digits in allowed set {1,2,3,4,5,6,7,8}</span>
                    </div>
                </div>
            </div>

            <div class="result-section" id="result-section">
                <div class="result-message" id="result-message"></div>
            </div>
        </div>
    </div>

    <script src="index.js"></script>
</body>
</html>
```

### A.2 Validation Logic (index.js)

Refer to the complete JavaScript implementation in the project repository.

### A.3 Styling (index.css)

Refer to the complete CSS implementation in the project repository with cyberpunk-inspired design featuring:
- Dark navy background (#0a0e27)
- Cyan accent color (#00d9ff)
- Poppins font family
- Material Icons integration
- Responsive breakpoints at 768px and 480px

---

## APPENDIX B: MATHEMATICAL PROOFS

### B.1 Prime Sum Range

**Theorem:** For digits d₁, d₂, d₃, d₄ ∈ {1, 2, 3, 4, 5, 6, 7, 8}, the sum S = d₁ + d₂ + d₃ + d₄ satisfies 4 ≤ S ≤ 32.

**Proof:**
- Minimum: All digits = 1 → S_min = 1+1+1+1 = 4
- Maximum: All digits = 8 → S_max = 8+8+8+8 = 32

**Possible prime sums:** {5, 7, 11, 13, 17, 19, 23, 29, 31}

Note: 4 is composite (2²), and 32 is composite (2⁵).

### B.2 Modular Arithmetic Solutions

**Theorem:** For (d₁ × d₄) mod 7 = 3 where d₁, d₄ ∈ {1,2,3,4,5,6,7,8}, there exist exactly 10 ordered pairs satisfying the constraint.

**Proof by Enumeration:**
Testing all 64 combinations (8 × 8), we find:
(1,3), (2,5), (3,1), (3,8), (5,2), (6,4), (7,8), (8,3), (8,7) satisfy the condition.

This represents 10/64 = 15.625% of all possible (d₁, d₄) pairs.

---

**End of Document**

---

**Project Repository:** https://github.com/BootlegYouki/DiscreteMathProj  
**Live Demo:** https://discrete-math-proj.vercel.app/  
**Local Demo:** Open `index.html` in any modern web browser

**Group 5 Developer:**  
Mark Darren O. Oandasan

