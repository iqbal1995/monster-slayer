new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame () {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack () {
            var demage = this.calculateDamage(3, 10)
            this.monsterHealth -= demage
            this.turns.unshift({
                isPlayer : true, 
                text: 'Player Hits Monster For' + demage
            })
            if (this.cekWin()) {
              return
            }

            this.monsterAttack()
        }, 
        specialAttack () {
            var demage = this.calculateDamage(10, 20)
            this.monsterHealth -= demage
            if (this.cekWin()) {
              return
            }
            this.turns.unshift({
                isPlayer : true, 
                text: 'Player Hits hard Monster For' + demage
            }) 

            this.monsterAttack()
        },
        heal () {
            if (this.playerHealth === 100) {
                this.playerHealth += 0 
            }else {
                this.playerHealth += 10
            }

            this.turns.unshift({
                isPlayer : true, 
                text: 'Player Heal for 10'
            }) 

            this.monsterAttack()
        },
        giveUp () {
            this.gameIsRunning = false
        },
        monsterAttack () {
            var demage = this.calculateDamage(5, 12)   
            this.playerHealth -= demage
            this.cekWin()
            this.turns.unshift({
                isPlayer : false, 
                text: 'Monster Hits Player For' + demage
            })
        },
        calculateDamage (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        }, 
        cekWin () {
            if (this.monsterHealth <= 0) {
                if (confirm('you won! new game ?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            } else if (this.playerHealth <= 0){
                if (confirm('you los! new game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            }
            return false
        }
    }
})