use std::collections::HashMap;

fn main() {
    let vec = Vec::<String>::from([
        String::from("Rock"),
        String::from("Scissors"),
        String::from("Scissors"),
        String::from("Scissors"),
        String::from("Paper"),
        String::from("Rock"),
        String::from("Rock"),
        String::from("Rock"),
        String::from("Scissors"),
        String::from("Paper")
    ]);

    let winners = HashMap::from([
        ("Rock", "Paper"),
        ("Paper", "Scissors"),
        ("Scissors", "Rock")
    ]);

    let mut highest_num = 0;
    let mut highest_idx = 0;
    let mut best_move = String::new();
    for (i, s) in vec.iter().enumerate() {
        let curr_move = winners.get(s.as_str()).expect("no key found");

        let mut current_number = 1;
        for j in 1..vec.len() {
            let idx = (j + i) % vec.len();

            let losing_move = winners.get(curr_move).expect("no key found");

            if *curr_move == vec[idx].as_str() {} //draw
            else if *losing_move == vec[idx].as_str() { //loss
                break;
            } else { //win
                current_number += 1;
            }
        }

        if current_number > highest_num {
            highest_idx = i;
            highest_num = current_number;
            best_move = String::from(*curr_move);
        }
    }

    println!("{best_move}");
    println!("{highest_idx}");

}