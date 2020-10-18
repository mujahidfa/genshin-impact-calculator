<template>
  <div id="app" class="flex flex-col py-8 x-20">
    <h1 class="text-3xl font-semibold text-center">
      Genshin Impact Calculator
    </h1>
    <div class="flex flex-row justify-center divide-x">
      <!-- Input section -->
      <section class="flex flex-col w-1/2 justify-start space-y-2 px-4">
        <h2 class="text-2xl text-center">Input:</h2>

        <!-- Input from Talent -->
        <section>
          <h3 class="text-xl font-semibold">Input from Talent</h3>
          <div class="flex">
            <label for="attackType">Choose an Attack Type:</label>
            <select
              name="attackType"
              id="attackType"
              v-model="attackType"
              class="border"
            >
              <option disabled value="">Please select one</option>
              <option
                v-for="(type, index) in attackTypeSelection"
                :key="index"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
          <div v-if="attackType !== ''">
            <label for="skillMultiplier">
              Skill Multiplier for {{ attackType }} (%):
            </label>
            <input
              id="skillMultiplier"
              type="number"
              min="0"
              v-model="skillMultiplier"
            />
          </div>
          <div class="flex">
            <label for="damageType">Choose a Damage Type:</label>
            <select
              name="damageType"
              id="damageType"
              v-model="damageType"
              class="border"
            >
              <option disabled value="">Please select one</option>
              <option
                v-for="(type, index) in damageTypeSelection"
                :key="index"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
        </section>

        <!-- Input from Character Details -->
        <section>
          <h3 class="text-xl font-semibold">Input from Character Details</h3>
          <div>
            <label for="characterLevel">Character level:</label>
            <input
              id="characterLevel"
              type="number"
              min="0"
              max="90"
              v-model="characterLevel"
            />
          </div>
          <div>
            <label for="baseATK">Base ATK:</label>
            <input id="baseATK" type="number" min="0" v-model="baseATK" />
          </div>
          <div>
            <label for="flatATK">Flat ATK:</label>
            <input id="flatATK" type="number" min="0" v-model="flatATK" />
          </div>
          <div>
            <label for="critRate">Crit Rate (%):</label>
            <input
              id="critRate"
              type="number"
              min="0"
              max="100"
              v-model="critRate"
            />
          </div>
          <div>
            <label for="critDMG">Crit DMG (%):</label>
            <input id="critDMG" type="number" min="0" v-model="critDMG" />
          </div>
          <div v-if="damageType !== ''">
            <label for="elementalTypeDMGBonus">
              {{ damageType }} DMG Bonus (%):
            </label>
            <input
              id="elementalTypeDMGBonus"
              type="number"
              min="0"
              v-model="elementalTypeDMGBonus"
            />
          </div>
        </section>

        <!-- Input type of attack bonuses from weapons, artifact sets, etc -->
        <section>
          <h3 class="text-xl font-semibold">
            Input type of attack bonuses from weapons, artifact sets, etc
          </h3>
          <div>
            <label for="weaponsDMGBonus">Weapons DMG Bonus (%) (if any):</label>
            <input
              id="weaponsDMGBonus"
              type="number"
              min="0"
              v-model="weaponsDMGBonus"
            />
          </div>
          <div>
            <label for="artifactSetsDMGBonus"
              >Artifact Sets DMG Bonus (%) (if any):</label
            >
            <input
              id="artifactSetsDMGBonus"
              type="number"
              min="0"
              v-model="artifactSetsDMGBonus"
            />
          </div>
          <div>
            <label for="otherDMGBonus">Other DMG Bonus (%) (if any):</label>
            <input
              id="otherDMGBonus"
              type="number"
              min="0"
              v-model="otherDMGBonus"
            />
          </div>
        </section>

        <button
          @click="showResults()"
          class="bg-green-600 hover:bg-green-800 text-white font-semibold"
        >
          Calculate
        </button>
        <button
          @click="reset()"
          class="bg-red-600 hover:bg-red-800 text-white font-semibold"
        >
          Reset
        </button>
      </section>

      <!-- Output section -->
      <section
        class="flex flex-col w-1/2 justify-start space-y-2 px-4"
        v-show="isCalculated"
      >
        <h2 class="text-2xl text-center">Output:</h2>
        <div class="flex items-center">
          <h3 class="text-xl font-semibold">Chosen DMG TYPE:</h3>
          <p>{{ damageType }}</p>
        </div>

        <h3 class="text-xl font-semibold">Output Damage</h3>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Normal DMG (Before reduction) =</h4>
          <p>{{ normalDMGBeforeReduction }}</p>
        </div>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Crit DMG (Before reduction) =</h4>
          <p>{{ critDMGBeforeReduction }}</p>
        </div>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">
            Average DMG (Before reduction) =
          </h4>
          <p>{{ averageDMGBeforeReduction }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // Input from Talent
      attackType: "",
      attackTypeSelection: [
        "Elemental Skill",
        "Elemental Burst",
        "Normal Attack",
        "Charged Attack",
      ],
      skillMultiplier: 0,
      damageType: "",
      damageTypeSelection: [
        "Pyro",
        "Hydro",
        "Dendro",
        "Electro",
        "Anemo",
        "Cryo",
        "Geo",
        "Physical",
      ],

      // Input from Character Details
      characterLevel: 1,
      baseATK: 1,
      flatATK: 0,
      critRate: 0,
      critDMG: 0,
      elementalTypeDMGBonus: 0,

      // Input type of attack bonuses from weapons, artifact sets, etc
      weaponsDMGBonus: 0,
      artifactSetsDMGBonus: 0,
      otherDMGBonus: 0,

      // State variables
      isCalculated: false,

      // DMG Bonus
      // physicalDMGBonus: "",
      // pyroDMGBonus: "",
      // hydroDMGBonus: "",
      // dendroDMGBonus: "",
      // electroDMGBonus: "",
      // anemoDMGBonus: "",
      // cryoDMGBonus: "",
      // geoDMGBonus: "",

      // // Elemental Resonance Bonus
      // ferventFlames: "",
      // shatteringIce: "",
      // enduringRock: "",

      // // Reaction Type
      // meltReactionType: "",
      // vaporizeReactionType: "",
      // shatterReactionType: "",

      // overload: "",
      // superconduct: "",
      // electrocharge: "",

      // swirl: "",

      // // Input from Artifact Set Bonuses
      // artifactSetBonusesAtk: "",
      // artifactSetBonusesBurst: "",

      // // Input from Other Character Buffs
      // otherCharacterBuffsAtk: "",
      // otherCharacterBuffsElementalMastery: "",
    };
  },
  computed: {
    totalTypeOfAttackDMGBonus() {
      return (
        this.weaponsDMGBonus + this.artifactSetsDMGBonus + this.otherDMGBonus
      );
    },
    // TODO
    allATKBonuses() {
      return 0;
    },
    totalATK() {
      return this.baseATK * (1 + this.allATKBonuses) + this.flatATK;
    },
    dmgBonus() {
      return (
        this.getPercentage(this.elementalTypeDMGBonus) +
        this.getPercentage(this.totalTypeOfAttackDMGBonus)
      );
    },
    normalDMGBeforeReduction() {
      return (
        this.totalATK *
        (1 + this.dmgBonus) *
        this.getPercentage(this.skillMultiplier)
      );
    },
    critDMGBeforeReduction() {
      return (
        this.normalDMGBeforeReduction * (1 + this.getPercentage(this.critDMG))
      );
    },
    averageDMGBeforeReduction() {
      return (
        this.normalDMGBeforeReduction *
        (1 +
          this.getPercentage(this.critRate) * this.getPercentage(this.critDMG))
      );
    },
  },
  methods: {
    getPercentage(value) {
      return value / 100;
    },
    showResults() {
      if (this.attackType === "" || this.damageType === "") {
        alert("Please select an Attack Type and a Damage Type.");
        return;
      } else {
        this.isCalculated = true;
        return;
      }
    },
    reset() {
      window.location.reload();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* display: flex;
  flex-direction: column;
  text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  /* background-image: url("./assets/background.jpeg"); */
  /* background-repeat: no-repeat; */
  /* background: url("./assets/background.jpeg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; */
}

input {
  @apply border border-gray-400;
}

/* label,
h3,
h4,
span,
h2 {
  @apply text-white;
} */
</style>
