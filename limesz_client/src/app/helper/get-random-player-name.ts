const names =
[
  "Anon",
    "MiniPig",
    "Arnold",
    "LuckyDuck",
    "SunnySide",
    "ShadowKnight",
    "CoolCucumber",
    "GoldenEagle",
    "FireDragon",
    "SilverFox",
    "MysticMoon",
    "CaptainMarvel",
    "SapphireRose",
    "ThunderStrike",
    "EmeraldStar",
    "IronMan",
    "ScarletWitch",
    "BlueJasmine",
    "PhoenixRising",
    "StealthyNinja",
    "AmberTiger",
    "PrincessPeach",
    "MidnightRider",
    "PixelPioneer",
    "RainbowRider",
    "DiamondDiva",
    "BlackWidow",
    "StarGazer",
    "CrimsonComet",
    "NeonNebula",
    "PlatinumPirate",
    "ElectricEel",
    "CherryBlossom",
    "RedViper",
    "JadeJaguar",
    "OceanSiren",
    "MightyThor",
    "FrostyPhoenix",
    "MoonlightMage",
    "EternalFlame",
    "SteelSorcerer",
    "PandaPaladin",
    "CopperKnight",
    "EmeraldEnigma",
    "CandyCane",
    "BoltBlazer",
    "MysticalMermaid",
    "EnchantedElf",
    "CrimsonWitch",
    "CobaltCobra",
    "MidnightMarauder",
    "GalacticGuardian",
    "PlasmaProwler",
    "NebulaNinja",
    "AmethystAlchemist",
    "ScarletSorceress",
    "LunarLion",
    "TopazTitan",
    "DaringDolphin",
    "GoldenGriffin",
    "RapidRaven",
    "JungleJester",
    "AquaAssassin",
    "BlazingBard",
    "SapphireSerpent",
    "ShadowShaman",
    "DragonDuchess",
    "VioletVigilante",
    "MysticMandrake",
    "RubyRogue",
    "ThunderPhoenix",
    "SpartanSiren",
    "MidnightMystic",
    "IronIvy",
    "SilentStorm",
    "GreenGoddess",
    "CrystalCentaur",
    "FireFox",
    "SnowySwan",
    "DaringDuke",
    "BlazingBrook",
    "CrimsonCavalier"
];

export function getRandomPlayerName(): string {
  return names[Math.floor(Math.random() * names.length)];
}
