import type { Cure } from "../Game/Cure";
import type { Player } from "../Game/Player";

export default function getDisregardedCities(players: Player[], cures: Cure[]) {
  const quarantineSpecialist = players.find(
    (player) => player.role.name === "Quarantine Specialist",
  );

  const medic = players.find((player) => player.role.name === "Medic");

  const disregardCities = new Set<string>();
  if (quarantineSpecialist) {
    disregardCities.add(quarantineSpecialist.currentLocation.name);
    for (const connectingCity of quarantineSpecialist.currentLocation
      .connections)
      disregardCities.add(connectingCity.name);
  }

  if (medic) {
    // Medic also disregards cities with cured diseases
    const medicLocationCureColor = cures.find(
      (cure) => cure.color === medic.currentLocation.color,
    ) as Cure;

    if (medicLocationCureColor.cured) {
      disregardCities.add(medic.currentLocation.name);
    }
  }
  return disregardCities;
}
