<template>
  <div id="app" class="flex flex-col py-8 x-20">
    <h1 class="text-3xl font-semibold text-center">
      Elemental Reaction Hit (when combining 2 elements)
    </h1>
    <div class="flex flex-row justify-center divide-x">
      <!-- Input section -->
      <section class="flex flex-col justify-start w-1/2 px-4 space-y-2">
        <h2 class="text-2xl text-center">Input:</h2>

        <!-- What Reaction Occurred -->
        <section>
          <h3 class="text-xl font-semibold">What Reaction Occurred</h3>
          <div class="flex">
            <label for="reactionType">Choose a Reaction Type:</label>
            <select
              name="reactionType"
              id="reactionType"
              v-model="reactionType"
              class="border"
            >
              <option disabled value="">Please select one</option>
              <option
                v-for="(type, index) in reactionTypeSelection"
                :key="index"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
          <div class="flex" v-if="reactionType !== ''">
            <label for="triggerReactionElement"
              >Which element triggers the reaction?</label
            >
            <select
              name="triggerReactionElement"
              id="triggerReactionElement"
              v-model="triggerReactionElement"
              class="border"
            >
              <option disabled value="">Please select one</option>
              <option
                v-for="(element, index) in triggerReactionElementSelection"
                :key="index"
                :value="element"
              >
                {{ element }}
              </option>
            </select>
          </div>
        </section>

        <!-- Input From Standard Hit -->
        <section>
          <h3 class="text-xl font-semibold">Input From Standard Hit</h3>
          <div>
            <label for="normalDMGBeforeReduction">
              Normal DMG (before reduction):
            </label>
            <input
              id="normalDMGBeforeReduction"
              type="number"
              min="1"
              v-model="normalDMGBeforeReduction"
            />
          </div>
          <div>
            <label for="critDMGBeforeReduction">
              Crit DMG (before reduction):
            </label>
            <input
              id="critDMGBeforeReduction"
              type="number"
              min="1"
              v-model="critDMGBeforeReduction"
            />
          </div>
          <div>
            <label for="averageDMGBeforeReduction">
              Average DMG (before reduction):
            </label>
            <input
              id="averageDMGBeforeReduction"
              type="number"
              min="1"
              v-model="averageDMGBeforeReduction"
            />
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
        </section>

        <section class="my-4">
          <h3 class="text-xl font-semibold">
            Elemental Mastery
          </h3>
          <div>
            <label for="elementalMastery">Elemental Mastery:</label>
            <input
              id="elementalMastery"
              type="number"
              min="0"
              v-model="elementalMastery"
            />
          </div>
        </section>

        <!-- Input type of attack bonuses from weapons, artifact sets, etc -->
        <section v-if="reactionType !== ''">
          <h3 class="text-xl font-semibold">
            Input type of attack bonuses from weapons, artifact sets, etc
          </h3>
          <div>
            <label for="constellationArtifactBonus">
              {{ reactionType }} DMG Bonus (%) (if any):
            </label>
            <input
              id="constellationArtifactBonus"
              type="number"
              min="0"
              v-model="constellationArtifactBonus"
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
          <h3 class="text-xl font-semibold">Output DMG TYPE:</h3>
          <p>{{ triggerReactionElement }}</p>
        </div>

        <h3 class="text-xl font-semibold">Amplified DMG (Before Reduction)</h3>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Amplified Normal DMG =</h4>
          <p>{{ amplifiedNormalDMGBeforeReduction }}</p>
        </div>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Amplified Crit DMG =</h4>
          <p>{{ amplifiedCritDMGBeforeReduction }}</p>
        </div>
        <div class="flex items-center">
          <h4 class="text-lg font-semibold">Amplified Average DMG =</h4>
          <p>{{ amplifiedAverageDMGBeforeReduction }}</p>
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
      // What Reaction Occurred
      reactionType: "",
      reactionTypeSelection: ["Vaporize (Hydro + Pyro)", "Melt (Cryo + Pyro)"],
      triggerReactionElement: "",

      // Input From Standard Hit
      normalDMGBeforeReduction: 1,
      critDMGBeforeReduction: 1,
      averageDMGBeforeReduction: 1,
      critRate: 0,
      critDMG: 0,

      elementalMastery: 0,

      // Input from Constellation and Artifact Bonus
      constellationArtifactBonus: 0,

      // State variables
      isCalculated: false,
    };
  },
  computed: {
    triggerReactionElementSelection() {
      if (this.reactionType === this.reactionTypeSelection[0]) {
        return ["Hydro", "Pyro"];
      }

      if (this.reactionType === this.reactionTypeSelection[1]) {
        return ["Pyro", "Cyro"];
      }

      return [];
    },
    reactionBonus() {
      // if Vaporize and Hydro
      if (
        this.reactionType === this.reactionTypeSelection[0] &&
        this.triggerReactionElement === "Hydro"
      ) {
        return 200;
      }
      // if Vaporize and Pyro
      if (
        this.reactionType === this.reactionTypeSelection[0] &&
        this.triggerReactionElement === "Pyro"
      ) {
        return 150;
      }
      // if Melt and Pyro
      if (
        this.reactionType === this.reactionTypeSelection[1] &&
        this.triggerReactionElement === "Pyro"
      ) {
        return 200;
      }
      // if Melt and Cyro
      if (
        this.reactionType === this.reactionTypeSelection[1] &&
        this.triggerReactionElement === "Cyro"
      ) {
        return 150;
      }
      return 0;
    },
    elementalMasteryBonus() {
      return (
        0.197 *
        this.elementalMastery *
        Math.exp(-(0.00063 * this.elementalMastery))
      );
    },
    amplifiedNormalDMGBeforeReduction() {
      return (
        this.normalDMGBeforeReduction *
        this.getPercentage(this.reactionBonus) *
        (1 +
          this.getPercentage(this.elementalMasteryBonus) +
          this.getPercentage(this.constellationArtifactBonus))
      );
    },
    amplifiedCritDMGBeforeReduction() {
      return (
        this.critDMGBeforeReduction *
        this.getPercentage(this.reactionBonus) *
        (1 +
          this.getPercentage(this.elementalMasteryBonus) +
          this.getPercentage(this.constellationArtifactBonus))
      );
    },
    amplifiedAverageDMGBeforeReduction() {
      return (
        this.amplifiedNormalDMGBeforeReduction *
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
      if (this.reactionType === "" || this.triggerReactionElement === "") {
        alert(
          "Please select a Reaction Type and an Element that triggers the Reaction."
        );
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

<style scoped>
input {
  @apply border border-gray-400;
}
</style>
