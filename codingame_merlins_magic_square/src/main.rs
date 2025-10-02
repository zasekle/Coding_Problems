use std::io;

fn main() {
    let mut game_board: Vec<Vec<bool>> = Vec::new();

    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    game_board = push_row_to_board(
        input_line.trim_matches('\n').to_string(),
        game_board
    );

    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    game_board = push_row_to_board(
        input_line.trim_matches('\n').to_string(),
        game_board
    );

    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    game_board = push_row_to_board(
        input_line.trim_matches('\n').to_string(),
        game_board
    );

    let mut input_line = String::new();
    io::stdin().read_line(&mut input_line).unwrap();
    let all_buttons_pressed = input_line.trim_matches('\n').to_string().as_bytes().to_vec();

    for button in all_buttons_pressed {
        flip(
            button as char,
            &mut game_board
        );
    }

    for i in 1..=9 {
        let winning_move = check_for_won_game(
            char::from_digit(i, 10).unwrap(),
            &game_board
        );

        if winning_move {
            println!("{i}");
        }
    }

}

fn print_board(game_board: &Vec<Vec<bool>>) {
    for vec in game_board {
        let mut row = String::new();
        for b in vec {
            row += if *b {"*"} else {"~"};
        }
        println!("{row}");
    }
}

fn check_for_won_game(
    button: char,
    game_board: &Vec<Vec<bool>>
) -> bool {

    let winning_board = Vec::from([
        Vec::from([true, true, true]),
        Vec::from([true, false, true]),
        Vec::from([true, true, true]),
    ]);

    let mut board_copy = game_board.clone();

    flip(
        button,
        &mut board_copy
    );

    winning_board == board_copy
}

fn flip(
    button: char,
    game_board: &mut Vec<Vec<bool>>
) {
    match button {
        '1' => {
            game_board[0][0] = !game_board[0][0];
            game_board[0][1] = !game_board[0][1];
            game_board[1][0] = !game_board[1][0];
            game_board[1][1] = !game_board[1][1];
        }
        '2' => {
            game_board[0][0] = !game_board[0][0];
            game_board[0][1] = !game_board[0][1];
            game_board[0][2] = !game_board[0][2];
        }
        '3' => {
            game_board[0][1] = !game_board[0][1];
            game_board[0][2] = !game_board[0][2];
            game_board[1][1] = !game_board[1][1];
            game_board[1][2] = !game_board[1][2];
        }
        '4' => {
            game_board[0][0] = !game_board[0][0];
            game_board[1][0] = !game_board[1][0];
            game_board[2][0] = !game_board[2][0];
        }
        '5' => {
            game_board[0][1] = !game_board[0][1];
            game_board[1][0] = !game_board[1][0];
            game_board[1][1] = !game_board[1][1];
            game_board[1][2] = !game_board[1][2];
            game_board[2][1] = !game_board[2][1];
        }
        '6' => {
            game_board[0][2] = !game_board[0][2];
            game_board[1][2] = !game_board[1][2];
            game_board[2][2] = !game_board[2][2];
        }
        '7' => {
            game_board[1][0] = !game_board[1][0];
            game_board[1][1] = !game_board[1][1];
            game_board[2][0] = !game_board[2][0];
            game_board[2][1] = !game_board[2][1];
        }
        '8' => {
            game_board[2][0] = !game_board[2][0];
            game_board[2][1] = !game_board[2][1];
            game_board[2][2] = !game_board[2][2];
        }
        _ => { //'9'
            game_board[1][1] = !game_board[1][1];
            game_board[1][2] = !game_board[1][2];
            game_board[2][1] = !game_board[2][1];
            game_board[2][2] = !game_board[2][2];
        }
    }
}

fn push_row_to_board(
    row:  String,
    mut game_board: Vec<Vec<bool>>
) -> Vec<Vec<bool>> {
    let mut temp_vec = Vec::<bool>::new();
    for c in row.chars() {
        if c == '~' {
            temp_vec.push(false);
        } else if c == '*' {
            temp_vec.push(true);
        }
    }

    game_board.push(temp_vec);

    game_board
}