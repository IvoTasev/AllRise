import { Router, json } from 'express';
import db from '../database/database';
import bodyParser from 'body-parser';

const router = Router();
router.db = db;

router.use(json());
router.use(bodyParser.urlencoded({ extended: true }));


router.db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization");
    req.db = db;
    next();
});

router.get('/', (req, res) => {
    res.send("routes: \n /users \n/challenges");
});

router.get('/users', (req, res) => {
    router.db.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/challenges', (req, res) => {
    router.db.query("SELECT * FROM challenges", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/challengeWaiting/:userId', (req, res) => {
    router.db.query("SELECT * FROM challenges WHERE (winner_id IS NULL) AND (participant_id = ? OR creator_id = ?)",[req.params.userId, req.params.userId ] ,(err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


router.get('/challenge-registration',(req, res) => {
    router.db.query("SELECT * FROM challenge_registration", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/health_fact',(req, res) => {
    router.db.query("SELECT * FROM health_facts ORDER BY rand() limit 1", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/goals/:user_id', (req, res)=>{
    let query = "SELECT * FROM goals WHERE user_id = ? ";
    router.db.query(query, [ req.params.user_id ], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

router.post('/goals/:name/:desciption/:user_id', (req, res)=>{
    let query = "INSERT INTO goals (name, desciption, user_id) VALUES (?, ?, ?)";
    router.db.query(query, [req.params.name, req.params.desciption, req.params.user_id] , (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

router.post('/goals/:id/:desciption', (req, res)=>{  //database had description instead of progress
    let query = "UPDATE goals SET desciption = ? WHERE id = ?";
    router.db.query(query, [ req.params.desciption, req.params.id] , (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/users/:id/', (req, res) => {
    let query = "SELECT * FROM Users WHERE id = ? ";
    router.db.query( query,[ req.params.id ] , (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/users/:id/:name/:calories/:points/:steps', (req, res) => {
    let query = "INSERT INTO users (id, name, calories, points, steps) VALUES (?, ?, ?, ?, ?)";
    router.db.query(query, [req.params.id, req.params.name, req.params.calories, req.params.points, req.params.steps], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.post('/challenges/:name/:reward/:creator_id/:participant_id', (req, res) => {
    let query = "INSERT INTO challenges (name, reward, creator_id, participant_id, fixed) VALUES (?, ?, ?, ?, ?)";
    router.db.query(query, [req.params.name, req.params.reward, req.params.creator_id, req.params.participant_id, 0], (err, result) =>{
        if (err) throw err;
        res.json(result);
    })
});

router.post('/challenges/fixed/:name/:reward/:creator_id/:participant_id', (req, res) => {
    let query = "INSERT INTO challenges (name, reward, creator_id, participant_id, fixed) VALUES (?, ?, ?, ?, ?)";
    router.db.query(query, [req.params.name, req.params.reward, req.params.creator_id, req.params.participant_id, 1], (err, result) =>{
        if (err) throw err;
        res.json(result);
    })
});

router.get('/coupons/:user_id', (req, res) => {
    let query = "SELECT id, name, reward FROM challenges INNER JOIN challenge_registration ON challenge_registration.user_id = challenges.winner_id WHERE challenges.winner_id = ?";
    router.db.query(query, req.params.user_id, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

router.post('/challenges/:challenge_id/:winner_id', (req, res) => {
    let query = "SELECT id FROM users WHERE id = ? ";
    let update =  " UPDATE challenges SET winner_id = (" + query+ ") WHERE id = ? ";

    router.db.query(update, [req.params.winner_id, req.params.challenge_id], (err, result) => {
        if(err) throw err;
        res.json(result)
    });
});

router.get('/coupon/winner/:winner_id', (req, res) => {
    let query = "SELECT coupon.*, winner.name AS 'winner', loser.name AS 'loser' FROM `coupon`  INNER JOIN `users` AS winner ON coupon.winner_id = winner.id " +
        "INNER JOIN `users` AS loser ON coupon.loser_id = loser.id  WHERE coupon.winner_id = ?";
    router.db.query(query, req.params.winner_id, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});
router.get('/coupon/loser/:loser_id', (req, res) => {
    let query = "SELECT coupon.*, winner.name AS 'winner', loser.name AS 'loser' FROM `coupon`  INNER JOIN `users` AS winner ON coupon.winner_id = winner.id " +
        "INNER JOIN `users` AS loser ON coupon.loser_id = loser.id  WHERE coupon.loser_id = ?";
    router.db.query(query, req.params.loser_id, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

router.post('/coupon/:description/:winner_id/:loser_id', (req, res) => {
    let query = "INSERT INTO `coupon` (`id`, `description`, `winner_id`, `loser_id`, `activated`) VALUES (NULL, ?, ?, ?, '0')";
    router.db.query(query, [req.params.description, req.params.winner_id, req.params.loser_id], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

router.post('/coupon/:activator/:id', (req, res) => {
    let update = "UPDATE coupon SET activated = ?  WHERE id = ?";
    router.db.query(update, [req.params.activator, req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

router.post('/coupon/:id', (req, res) => {
    let update = "DELETE FROM coupon WHERE id = ?";
    router.db.query(update, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
})

export default router;
