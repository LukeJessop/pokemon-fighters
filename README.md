# Pokemon Fighter clicker game

User Experience:
- Greeted with a page to enter their username and what starter they want.
    - Fire
    - Water
    - Lightning
- After selecting what they want, there will be a side bar with 3 “component” links
    - Fighting
    - Gym
    - Medbay
Gym:
- This is the first page you will be on by default and you will have your Pokemon listed out
    - Each Pokemon item will have these items on its icon
        - Damage
            - Increases per level, damage + damage * .15
        - Health
            - Increases per level, health + health * .15
        - Level
            - Subdivided into xp each level increases the xp amount by xp * .50
        - Evolution
            - Divided into 100 levels (max level for each Pokemon is 100 and 100 is full evolution)
        - <button> Train
            - One click will increase the xp by 2 * Level & decrease health by 1
Fighting:
- In the fighting component we will have Pokemon battles where if you win then you get the enemy Pokemon as a new Pokemon, and if you lose then your Pokemon goes to the Medbay component
- You can attack and your attacks scale based on the pokemons level
