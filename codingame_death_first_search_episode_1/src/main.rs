struct Link {
    index: i32,
    severed: bool
}

struct Node {
    links: Vec<Link>,
    gateway: bool
}

fn main() {
    let mut nodes = Vec::<Node>::new();
    loop {
        let enemy_node_idx = 3 as i32;

        let mut first_sever: i32 = -1;
        let mut second_sever: i32 = -1;
        let mut link_idx = 0;
        'outer: for (i, node) in nodes.iter_mut().enumerate() {
            if node.gateway {
                for (j, link) in node.links.iter_mut().enumerate() {
                    if !link.severed {
                        if enemy_node_idx == link.index {
                            first_sever = i as i32;
                            second_sever = link.index;
                            link_idx = j;
                            break 'outer;
                        } else {
                            first_sever = i as i32;
                            second_sever = link.index as i32;
                            link_idx = j;
                        }
                    }
                }
            }
        }

        nodes[first_sever as usize].links[link_idx].severed = true;

        println!("{first_sever} {second_sever}");
    }

}
