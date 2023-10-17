import NormalSvg from "../../Assets/typesvgs/normal.svg";
import FireSvg from "../../Assets/typesvgs/fire.svg";
import WaterSvg from "../../Assets/typesvgs/water.svg";
import ElectricSvg from "../../Assets/typesvgs/electric.svg";
import GrassSvg from "../../Assets/typesvgs/grass.svg";
import IceSvg from "../../Assets/typesvgs/ice.svg";
import FightingSvg from "../../Assets/typesvgs/fighting.svg";
import PoisonSvg from "../../Assets/typesvgs/poison.svg";
import GroundSvg from "../../Assets/typesvgs/ground.svg";
import FlyingSvg from "../../Assets/typesvgs/flying.svg";
import PsychicSvg from "../../Assets/typesvgs/psychic.svg";
import BugSvg from "../../Assets/typesvgs/bug.svg";
import RockSvg from "../../Assets/typesvgs/rock.svg";
import GhostSvg from "../../Assets/typesvgs/ghost.svg";
import DragonSvg from "../../Assets/typesvgs/dragon.svg";
import DarkSvg from "../../Assets/typesvgs/dark.svg";
import SteelSvg from "../../Assets/typesvgs/steel.svg";
import FairySvg from "../../Assets/typesvgs/fairy.svg";

export const typeMap = [
    {
      type: "Normal",
      icon: NormalSvg,
      strengths: [],
      weaknesses: [{ type: "Fighting", icon: FightingSvg }]
    },
    {
      type: "Fire",
      icon: FireSvg,
      strengths: [
        { type: "Grass", icon: GrassSvg },
        { type: "Ice", icon: IceSvg },
        { type: "Bug", icon: BugSvg },
        { type: "Steel", icon: SteelSvg }
      ],
      weaknesses: [
        { type: "Fire", icon: FireSvg },
        { type: "Water", icon: WaterSvg },
        { type: "Rock", icon: RockSvg }
      ]
    },
    {
      type: "Water",
      icon: WaterSvg,
      strengths: [
        { type: "Fire", icon: FireSvg },
        { type: "Ground", icon: GroundSvg },
        { type: "Rock", icon: RockSvg }
      ],
      weaknesses: [
        { type: "Water", icon: WaterSvg },
        { type: "Electric", icon: ElectricSvg }
      ]
    },
    {
      type: "Electric",
      icon: ElectricSvg,
      strengths: [
        { type: "Water", icon: WaterSvg },
        { type: "Flying", icon: FlyingSvg }
      ],
      weaknesses: [
        { type: "Electric", icon: ElectricSvg },
        { type: "Ground", icon: GroundSvg }
      ]
    },
    {
      type: "Grass",
      icon: GrassSvg,
      strengths: [
        { type: "Water", icon: WaterSvg },
        { type: "Ground", icon: GroundSvg },
        { type: "Rock", icon: RockSvg }
      ],
      weaknesses: [
        { type: "Fire", icon: FireSvg },
        { type: "Grass", icon: GrassSvg },
        { type: "Poison", icon: PoisonSvg },
        { type: "Flying", icon: FlyingSvg },
        { type: "Bug", icon: BugSvg }
      ]
    },
    {
      type: "Ice",
      icon: IceSvg,
      strengths: [
        { type: "Grass", icon: GrassSvg },
        { type: "Ground", icon: GroundSvg },
        { type: "Flying", icon: FlyingSvg },
        { type: "Dragon", icon: DragonSvg }
      ],
      weaknesses: [
        { type: "Fire", icon: FireSvg },
        { type: "Water", icon: WaterSvg },
        { type: "Ice", icon: IceSvg },
        { type: "Steel", icon: SteelSvg }
      ]
    },
    {
      type: "Fighting",
      icon: FightingSvg,
      strengths: [
        { type: "Normal", icon: NormalSvg },
        { type: "Ice", icon: IceSvg },
        { type: "Rock", icon: RockSvg },
        { type: "Dark", icon: DarkSvg },
        { type: "Steel", icon: SteelSvg }
      ],
      weaknesses: [
        { type: "Flying", icon: FlyingSvg },
        { type: "Psychic", icon: PsychicSvg },
        { type: "Fairy", icon: FairySvg }
      ]
    },
    {
      type: "Poison",
      icon: PoisonSvg,
      strengths: [
        { type: "Grass", icon: GrassSvg },
        { type: "Fairy", icon: FairySvg }
      ],
      weaknesses: [
        { type: "Poison", icon: PoisonSvg },
        { type: "Ground", icon: GroundSvg },
        { type: "Rock", icon: RockSvg },
        { type: "Ghost", icon: GhostSvg },
        { type: "Steel", icon: SteelSvg }
      ]
    },
    {
      type: "Ground",
      icon: GroundSvg,
      strengths: [
        { type: "Fire", icon: FireSvg },
        { type: "Electric", icon: ElectricSvg },
        { type: "Poison", icon: PoisonSvg },
        { type: "Rock", icon: RockSvg },
        { type: "Steel", icon: SteelSvg }
      ],
      weaknesses: [
        { type: "Grass", icon: GrassSvg },
        { type: "Ice", icon: IceSvg },
        { type: "Water", icon: WaterSvg }
      ]
    },
    {
      type: "Flying",
      icon: FlyingSvg,
      strengths: [
        { type: "Grass", icon: GrassSvg },
        { type: "Fighting", icon: FightingSvg },
        { type: "Bug", icon: BugSvg }
      ],
      weaknesses: [
        { type: "Electric", icon: ElectricSvg },
        { type: "Ice", icon: IceSvg },
        { type: "Rock", icon: RockSvg }
      ]
    },
    {
      type: "Psychic",
      icon: PsychicSvg,
      strengths: [
        { type: "Fighting", icon: FightingSvg },
        { type: "Poison", icon: PoisonSvg }
      ],
      weaknesses: [
        { type: "Psychic", icon: PsychicSvg },
        { type: "Dark", icon: DarkSvg },
        { type: "Steel", icon: SteelSvg }
      ]
    },
    {
      type: "Bug",
      icon: BugSvg,
      strengths: [
        { type: "Grass", icon: GrassSvg },
        { type: "Psychic", icon: PsychicSvg },
        { type: "Dark", icon: DarkSvg }
      ],
      weaknesses: [
        { type: "Fire", icon: FireSvg },
        { type: "Fighting", icon: FightingSvg },
        { type: "Flying", icon: FlyingSvg },
        { type: "Poison", icon: PoisonSvg },
        { type: "Ghost", icon: GhostSvg },
        { type: "Steel", icon: SteelSvg }
      ]
    },
    {
      type: "Rock",
      icon: RockSvg,
      strengths: [
        { type: "Fire", icon: FireSvg },
        { type: "Ice", icon: IceSvg },
        { type: "Flying", icon: FlyingSvg },
        { type: "Bug", icon: BugSvg }
      ],
      weaknesses: [
        { type: "Fighting", icon: FightingSvg },
        { type: "Ground", icon: GroundSvg },
        { type: "Steel", icon: SteelSvg }
      ]
    },
    {
      type: "Ghost",
      icon: GhostSvg,
      strengths: [
        { type: "Psychic", icon: PsychicSvg },
        { type: "Ghost", icon: GhostSvg }
      ],
      weaknesses: [
        { type: "Normal", icon: NormalSvg },
        { type: "Dark", icon: DarkSvg }
      ]
    },
    {
      type: "Dragon",
      icon: DragonSvg,
      strengths: [
        { type: "Dragon", icon: DragonSvg }
      ],
      weaknesses: [
        { type: "Steel", icon: SteelSvg },
        { type: "Fairy", icon: FairySvg }
      ]
    },
    {
      type: "Dark",
      icon: DarkSvg,
      strengths: [
        { type: "Psychic", icon: PsychicSvg },
        { type: "Ghost", icon: GhostSvg }
      ],
      weaknesses: [
        { type: "Fighting", icon: FightingSvg },
        { type: "Dark", icon: DarkSvg },
        { type: "Fairy", icon: FairySvg }
      ]
    },
    {
      type: "Steel",
      icon: SteelSvg,
      strengths: [
        { type: "Ice", icon: IceSvg },
        { type: "Rock", icon: RockSvg },
        { type: "Fairy", icon: FairySvg }
      ],
      weaknesses: [
        { type: "Fire", icon: FireSvg },
        { type: "Water", icon: WaterSvg },
        { type: "Electric", icon: ElectricSvg },
        { type: "Steel", icon: SteelSvg }
      ]
    },
    {
      type: "Fairy",
      icon: FairySvg,
      strengths: [
        { type: "Fighting", icon: FightingSvg },
        { type: "Dragon", icon: DragonSvg },
        { type: "Dark", icon: DarkSvg }
      ],
      weaknesses: [
        { type: "Fire", icon: FireSvg },
        { type: "Poison", icon: PoisonSvg },
        { type: "Steel", icon: SteelSvg }
      ]
    }
  ];
  