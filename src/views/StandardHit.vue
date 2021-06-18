<template>
  <div id="app" class="flex flex-col px-20 py-8">
    <h1 class="text-3xl font-semibold text-center">
      Standard Hit - (From Abilities, Elemental Skill and Burst)
    </h1>
    <div
      class="flex flex-row justify-center bg-gray-800 bg-opacity-75 divide-x"
    >
      <!-- Input section -->
      <section class="flex flex-col justify-start w-1/2 px-4 space-y-2">
        <h2 class="text-2xl text-center">Input:</h2>

        <!-- Input from Talent -->
        <section class="text-white">
          <h3 class="text-xl font-semibold">Input from Talent</h3>
          <div class="flex justify-between">
            <label for="attackType" class="font-bold"
              >Choose an Attack Type:</label
            >
            <select
              name="attackType"
              id="attackType"
              v-model="attackType"
              class="text-green-900 border"
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
          <div v-if="attackType !== ''" class="flex justify-between">
            <label for="skillMultiplier">
              Skill Multiplier for {{ attackType }} (%):
            </label>
            <input
              id="skillMultiplier"
              type="text"
              min="0"
              v-mask="'###%'"
              v-model="skillMultiplier"
            />
          </div>
          <div class="flex justify-between">
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
          class="font-semibold text-white bg-green-600 hover:bg-green-800"
        >
          Calculate
        </button>
        <button
          @click="reset()"
          class="font-semibold text-white bg-red-600 hover:bg-red-800"
        >
          Reset
        </button>
      </section>

      <!-- Output section -->
      <section
        class="flex flex-col justify-start w-1/2 px-4 space-y-2"
        v-show="isCalculated"
      >
        <h2 class="text-2xl text-center">Output:</h2>
        <div class="flex items-center">
          <h3 class="text-xl font-semibold">Chosen DMG TYPE:</h3>
          <p>{{ damageType }}</p>
        </div>

        <h3 class="text-xl font-semibold">Output DMG (before reduction):</h3>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Normal DMG =</h4>
          <p>{{ normalDMGBeforeReduction }}</p>
        </div>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Crit DMG =</h4>
          <p>{{ critDMGBeforeReduction }}</p>
        </div>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Average DMG =</h4>
          <p>{{ averageDMGBeforeReduction }}</p>
        </div>
        <div class="flex justify-center space-x-4">
          <router-link
            to="/elemental-reaction-hit"
            class="flex self-center px-8 py-4 mt-20 font-semibold text-white bg-green-500 hover:bg-green-700"
          >
            Next
          </router-link>
          <!-- <button
            class="flex self-center px-8 py-4 mt-20 font-semibold text-white bg-gray-500 hover:bg-gray-700"
          >
            Save
          </button> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "StandardHit",
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
        this.$store.state.normalDMGBeforeReduction = this.normalDMGBeforeReduction;
        this.$store.state.critDMGBeforeReduction = this.critDMGBeforeReduction;
        this.$store.state.averageDMGBeforeReduction = this.averageDMGBeforeReduction;
        this.$store.state.critRate = this.critRate;
        this.$store.state.critDMG = this.critDMG;

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

<style scoped>
input {
  @apply border border-gray-400;
}
</style>
