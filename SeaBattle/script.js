// console.log('script connected');

const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header'); 

const game = {
    ships: [],
    shipCount: 0,
    optionShip: {
        count: [1, 2, 3, 4],
        size: [4, 3, 2, 1]
    },
    // collision: [],  
    collision: new Set(), // or can be used --> collision: []
    generateShip() {
        for (let i = 0; i < this.optionShip.count.length; i++) {
            // console.log('count: ' + this.optionShip.count[i]);
            for (let j = 0; j < this.optionShip.count[i]; j++) {
                // console.log('size: ' + this.optionShip.size[i]);
                const size = this.optionShip.size[i];
                const ship = this.generateOptionShip(size);
                this.ships.push(ship);
                this.shipCount++;

            }
        }
    },
    generateOptionShip(shipSize) {
        const ship = {
            hit: [],
            location: [],
        };

        const direction = Math.random() < 0.5;
        let x, y;

        if (direction) {
            // console.log('Gorizontal:');
            x = Math.floor(Math.random() * 10);
            // console.log('x: ', x);
            y = Math.floor(Math.random() * (10 - shipSize));
            // console.log('y: ', y);
        } else {
            // console.log('Vertical:');
            x = Math.floor(Math.random() * (10 - shipSize));
            // console.log('x: ', x);
            y = Math.floor(Math.random() * 10);
            // console.log('y: ', y);
        }

        for (let i = 0; i < shipSize; i++) {
            if (direction) {
                ship.location.push(x + '' + (y + i));
            } else {
                ship.location.push((x + i) + '' + y);
            }
            ship.hit.push('');
        }

        // console.log('direction:', direction);

        if (this.checkCollision(ship.location)) {
            return this.generateOptionShip(shipSize);
        }

        this.addCollision(ship.location);

        return ship;
    },
    checkCollision(location) {
        for (const coordinate of location) {
            if (this.collision.has(coordinate)) { // 'has' it for collecton , or can be used --> 'includes' for the array           
                return true;
            }
        }
    },
    addCollision(location) {
        for (let i = 0; i < location.length; i++) {
            const startCoordinateX = location[i][0] - 1;
            // console.log('startCoordinateX: ', startCoordinateX);

            for (let j = startCoordinateX; j < startCoordinateX + 3; j++) {
                const startCoordinateY = location[i][1] - 1;
                // console.log('startCoordinateY: ', startCoordinateY);

                for (let z = startCoordinateY; z < startCoordinateY + 3; z++) {

                    if (j >= 0 && j < 10 && z >= 0 && z < 10) {
                        const coord = j + '' + z;
                        // console.log('coord: ', coord);
                        // if (!this.collision.includes(coord)) {this.collision.push(coord)} 

                        this.collision.add(coord); // it for collection , or can be used --> 'if' for the array
                                                                
                    }                
                }
            }
        }
    }
};

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0, 
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
}; 

const show = {
    hit: function(elem) {
        this.changeClass(elem, 'hit');  //  this --> show
    },
    miss: function(elem) {
        this.changeClass(elem, 'miss');  //  this --> show
    },
    dead: function(elem) {
        this.changeClass(elem, 'dead');  //  this --> show
    },
    changeClass: function(elem, value) {
        elem.className = value;
    }
};

const fire = (event) => {
    const target = event.target;
    // console.log(target.classList.tagName);
    if (target.classList.length > 0 || target.tagName !== 'TD' || game.shipCount === 0) return;    // clear BAG
    show.miss(target);
    play.updateData = 'shot';

    for (let i = 0; i < game.ships.length; i++) {
        const ship = game.ships[i];
        const index = ship.location.indexOf(target.id);

        if (index >= 0) {
            show.hit(target);
            play.updateData = 'hit';
            ship.hit[index] = 'x';
            const life = ship.hit.indexOf('');

            if (life < 0) {
                play.updateData = 'dead';
                for (const id of ship.location) {
                    show.dead(document.getElementById(id));
                }

                game.shipCount -= 1;

                if (game.shipCount < 1) {
                    // alert('Game Over!');
                    header.textContent = 'Game Over!';
                    header.style.color = 'red';

                    if (play.shot < play.record || play.record === 0) {
                        localStorage.setItem('seaBattleRecord', play.shot);
                        play.record = play.shot;
                        play.render();
                    }  
                }
            }
        }
    }
};

// localStorage.clear();

const init = () => {
    enemy.addEventListener('click', fire);
    play.render();
    game.generateShip();

    again.addEventListener('click', () => {
        location.reload();
    });

    record.addEventListener('dblclick', () => {
        localStorage.clear();
        play.record = 0;
        play.render(); 
    });

    // console.log(game.ships);
};

init();

// console.log(game);