
function eval() {
    // Do not use eval!!!
    return;
}

module.exports = {
    expressionCalculator
}

const digits = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0',
};

const math_operators = {
    '/': '/',
    '*': '*',
    '+': '+',
    '-': '-',
};

const math_brackets = {
    '(': '(',
    ')': ')',

};

const CONSOLE_LOG_ENABLE = false;

function expressionCalculator(expr) {

    if (CONSOLE_LOG_ENABLE) console.log(expr);
    expr = delete_space(expr);
    if (CONSOLE_LOG_ENABLE) console.log(expr);
    let isBracket = (expr.match(/[()]/g) || []).join('');
    if (CONSOLE_LOG_ENABLE) console.log(isBracket);
    let flag = check_brackets(isBracket);
    if (CONSOLE_LOG_ENABLE) console.log(flag);
    if (!flag) {
        if (CONSOLE_LOG_ENABLE) console.log(isBracket);
        throw 'ExpressionError: Brackets must be paired';
    }
    if (CONSOLE_LOG_ENABLE) console.log(expr);
    let myarray = math_str_to_math_array(expr);
    if (CONSOLE_LOG_ENABLE) console.log('myarray', isBracket.length / 2);
    for (let i = isBracket.length / 2; i > 0; i--) {
        position_array = find_frist_pair_bracket_positions_array(myarray);
        let tmp_array = myarray.slice(position_array[0] + 1, position_array[1]);
        if (CONSOLE_LOG_ENABLE) console.log('tmp_array', tmp_array);
        tmp_array = solve_without_bracket_array(tmp_array);
        myarray.splice(position_array[0], position_array[1] - position_array[0] + 1, tmp_array[0]);
        if (CONSOLE_LOG_ENABLE) console.log('myarray', myarray);
    }
    myarray = solve_without_bracket_array(myarray);
    if (CONSOLE_LOG_ENABLE) console.log(myarray);
    return (myarray[0]);
}



function check_brackets(str) {
    pair_string_array = ['()'];
    let find_pair = true;
    while (find_pair) {
        find_pair = false;
        for (let i = 0; i < pair_string_array.length; i++) {
            let num = str.indexOf(pair_string_array[i]);
            if (num >= 0) {
                str = str.slice(0, num) + str.slice(num + 2);
                find_pair = true;
            }
        }
    }
    if (str === '') {
        return true;
    }
    return false;
}




function math_str_to_math_array(str) {
    if (CONSOLE_LOG_ENABLE) console.log(str);
    let array = [];
    let array_count = 0;
    let is_a_digit_start = false;
    let digit_start = 0;

    for (let i = 0; i < str.length; i++) {
        if (is_a_digit_start) {
            if (!(str[i] in digits)) {
                is_a_digit_start = false;
                array[array_count] = +(str.slice(digit_start, i));
                array[++array_count] = str[i];
                ++array_count;
            }
        } else {
            if (str[i] in digits) {
                digit_start = i;
                is_a_digit_start = true;
            } else {
                array[array_count++] = str[i];

            }
        }
    }
    if (is_a_digit_start) {
        is_a_digit_start = false;
        array[array_count] = +(str.slice(digit_start));
        ++array_count;
    }

    if (CONSOLE_LOG_ENABLE) console.log(array);
    return array;
}



function solve_elementary_expression_mass(num1, str_operation, num2) {
    if (CONSOLE_LOG_ENABLE) console.log(num1, str_operation, num2);
    switch (str_operation) {
        case ('/'): {
            if (num2 == 0) {
                throw 'TypeError: Division by zero.';
            }
            return num1 / num2;
        }
        case ('*'): {
            return num1 * num2;
        }
        case ('+'): {
            return num1 + num2;
        }
        case ('-'): {
            return num1 - num2;
        }
    }

    throw 'TypeError: Unknown mathematicak operation.';
    return -1;
}


function find_frist_pair_bracket_positions_array(array) {
    if (CONSOLE_LOG_ENABLE) console.log('start find brackets');
    let position_array = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] == '(') {
            position_array[0] = i;
        } else if (array[i] == ')') {
            position_array[1] = i;
            if (CONSOLE_LOG_ENABLE) console.log('positions_bracket:', position_array);
            return position_array;
        }
    }
}



function solve_without_bracket_array(arr) {
    let operation_position = -1;
    if (CONSOLE_LOG_ENABLE) console.log('solve_without1', arr)
    do {
        if (CONSOLE_LOG_ENABLE) console.log('solve_without2', arr);
        operation_position = find_high_priority_math_operation_array(arr);
        if (CONSOLE_LOG_ENABLE) console.log('solve_without3', operation_position);
        if (operation_position == -1) {
            operation_position = find_low_priority_math_operation_array(arr);
            if (CONSOLE_LOG_ENABLE) console.log('solve_without4', operation_position);
        }
        if (operation_position != -1) {
            arr.splice(operation_position - 1, 3, solve_elementary_expression_mass(arr[operation_position - 1], arr[operation_position], arr[operation_position + 1]));
        }
    } while (operation_position != -1)
    if (CONSOLE_LOG_ENABLE) console.log('solve_without return', arr);
    return arr;
}


function find_high_priority_math_operation_array(array) {
    for (let i = 0; i < array.length; i++) {
        if ((array[i] === '/') || (array[i] === '*')) {
            return i;
        }
    }
    return -1;
}

function find_low_priority_math_operation_array(array) {
    if (CONSOLE_LOG_ENABLE) console.log('find_low_priority_math_operation_array(array)', array);
    for (let i = 0; i < array.length; i++) {
        if ((array[i] === '+') || (array[i] === '-')) {
            return i;
        }
    };
    return -1;
}


function delete_space(expr) {
    if (CONSOLE_LOG_ENABLE) console.log(expr);
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === ' ') {
            if (CONSOLE_LOG_ENABLE) console.log(expr);
            expr = expr.slice(0, i) + expr.slice(1 + i);
            i--;
        }
    }
    if (CONSOLE_LOG_ENABLE) console.log(expr);
    return expr;
}
