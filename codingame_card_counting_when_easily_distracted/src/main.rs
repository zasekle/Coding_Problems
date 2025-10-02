use std::collections::HashMap;

struct Card {
    remain: i32,
    value: i32,
}

fn main() {
    let stream_of_consciousness = "JACK.8.T00T.hungry.321!.3QAA63624J.Meagan Markle.AT&T.2-for-1 buffet.K76.AT&T.Did I turn the iron off?.TOOT.thirsty.Show Girls!!.QANON.K73K.J98959.blow on it for good luck.sound of surveillance camera moving.435.Gamblers Anonymous.AT&T.Meagan Markle.7TA.228JT.4AT645";
    let bust_threshold: i32 = 6;

    let input_vec = stream_of_consciousness.split('.');
    let mut remaining = HashMap::from([
        ('A', Card{remain: 4, value: 1}),
        ('2', Card{remain: 4, value: 2}),
        ('3', Card{remain: 4, value: 3}),
        ('4', Card{remain: 4, value: 4}),
        ('5', Card{remain: 4, value: 5}),
        ('6', Card{remain: 4, value: 6}),
        ('7', Card{remain: 4, value: 7}),
        ('8', Card{remain: 4, value: 8}),
        ('9', Card{remain: 4, value: 9}),
        ('T', Card{remain: 4, value: 10}),
        ('J', Card{remain: 4, value: 10}),
        ('Q', Card{remain: 4, value: 10}),
        ('K', Card{remain: 4, value: 10}),
    ]);

    for str in input_vec {
        let mut valid = true;
        for c in str.chars() {
            if !remaining.contains_key(&c) {
                valid = false;
            }
        }

        if !valid {
            continue;
        }

        for c in str.chars() {
            remaining.entry(c).and_modify(|k| (*k).remain -= 1);
        }
    }

    let mut num_stand: f32 = 0.0;
    let mut total: f32 = 0.0;
    for c in remaining.values() {
        if c.remain > 0 {
            if c.value < bust_threshold {
                num_stand += c.remain as f32;
            }
            total += c.remain as f32;
        }
    }

    println!("{:.0}%", 100.0 * num_stand/total);
}
